"""N8N-specific views for blog automation"""
import re
import logging
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
from .models import BlogPost, Category, Tag
from .serializers import BlogPostSerializer

logger = logging.getLogger(__name__)


class N8NPermission(BasePermission):
    """Permission class for n8n endpoints"""
    def has_permission(self, request, view):
        # Check for n8n token in header
        token = request.META.get('HTTP_N8N_TOKEN')
        # Get tokens from environment variables
        import os
        valid_tokens = os.getenv('N8N_TOKENS', 'dev-token-123,test-token-456').split(',')
        valid_tokens = [t.strip() for t in valid_tokens if t.strip()]
        return token in valid_tokens


class N8NBlogViewSet(viewsets.ModelViewSet):
    """
    ViewSet specifically designed for n8n automation.
    Provides simplified endpoints for blog post creation and management.
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [N8NPermission]
    lookup_field = 'slug'
    
    def create(self, request, *args, **kwargs):
        """
        Create a blog post with n8n-friendly payload.
        
        Expected payload:
        {
            "title": "Blog Post Title",
            "content": "Blog content in HTML or Markdown",
            "excerpt": "Short description",
            "author_id": 1,  # Optional, defaults to admin user
            "category": "ai-strategy",  # Slug or name
            "tags": ["ai", "automation"],  # List of tag names
            "status": "DRAFT",  # DRAFT, PUBLISHED, or ARCHIVED
            "is_featured": false,
            "featured_image": "https://example.com/image.jpg",
            "seo_title": "SEO Title",
            "seo_description": "SEO Description",
            "seo_keywords": "keyword1, keyword2",
            "publish_now": true  # If true and status is PUBLISHED, sets published_at
        }
        """
        data = request.data.copy()
        
        # Generate slug if not provided or empty
        if 'slug' not in data or not data.get('slug'):
            title = data.get('title', '')
            if title:
                data['slug'] = self._generate_unique_slug(title)
            else:
                return Response(
                    {"error": "Title is required for slug generation"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Handle category - accept either slug or name
        category_input = data.pop('category', None)
        if category_input:
            category = self._get_or_create_category(category_input)
            data['category_id'] = category.id
        
        # Handle tags - accept list of names
        tag_names = data.pop('tags', [])
        
        # Set author to first superuser if not provided
        if 'author_id' not in data and 'author' not in data:
            admin_user = User.objects.filter(is_superuser=True).first()
            if admin_user:
                data['author'] = admin_user.id
        
        # Handle publish_now flag
        publish_now = data.pop('publish_now', False)
        if publish_now and data.get('status') == 'PUBLISHED':
            data['published_at'] = timezone.now()
        
        # Calculate estimated read time if not provided
        if 'estimated_read_time' not in data and 'content' in data:
            data['estimated_read_time'] = self._calculate_read_time(data['content'])
        
        # Create the blog post
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        blog_post = serializer.save()
        
        # Update slug if it's empty (fallback)
        if not blog_post.slug:
            blog_post.slug = self._generate_unique_slug(blog_post.title)
            blog_post.save(update_fields=['slug'])
        
        # Handle tags after creation
        if tag_names:
            tags = [self._get_or_create_tag(name) for name in tag_names]
            blog_post.tags.set(tags)
        
        # Refresh from database to get all fields including slug
        blog_post.refresh_from_db()
        
        # Log the creation
        logger.info(f"N8N created blog post: {blog_post.title} (slug: {blog_post.slug})")
        
        # Return the created post with all fields
        serializer = BlogPostSerializer(blog_post)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        """
        Create multiple blog posts at once.
        Useful for content migration or batch processing.
        """
        posts_data = request.data.get('posts', [])
        created_posts = []
        errors = []
        
        for index, post_data in enumerate(posts_data):
            try:
                # Create a new request-like object with the post data
                post_request = type('Request', (), {
                    'data': post_data,
                    'META': request.META
                })()
                
                # Use the same logic as single create
                response = self.create(post_request)
                created_posts.append(response.data)
            except Exception as e:
                errors.append({
                    'index': index,
                    'title': post_data.get('title', 'Unknown'),
                    'error': str(e)
                })
        
        return Response({
            'created': len(created_posts),
            'failed': len(errors),
            'posts': created_posts,
            'errors': errors
        })
    
    @action(detail=True, methods=['post'])
    def publish(self, request, slug=None):
        """Quick publish a draft post"""
        post = self.get_object()
        post.status = 'PUBLISHED'
        post.published_at = timezone.now()
        post.save()
        return Response({
            'status': 'published',
            'published_at': post.published_at.isoformat(),
            'slug': post.slug
        })
    
    @action(detail=True, methods=['post'])
    def unpublish(self, request, slug=None):
        """Unpublish a post (set to draft)"""
        post = self.get_object()
        post.status = 'DRAFT'
        post.save()
        return Response({
            'status': 'draft',
            'slug': post.slug
        })
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """List all categories for n8n dropdown"""
        categories = Category.objects.all().values('id', 'name', 'slug')
        return Response(list(categories))
    
    @action(detail=False, methods=['get'])
    def tags(self, request):
        """List all tags for n8n multiselect"""
        tags = Tag.objects.all().values('id', 'name', 'slug')
        return Response(list(tags))
    
    @action(detail=False, methods=['get'])
    def health(self, request):
        """Health check endpoint for n8n monitoring"""
        return Response({
            'status': 'healthy',
            'environment': 'development',
            'api_version': '1.0',
            'timestamp': timezone.now().isoformat()
        })
    
    def _generate_unique_slug(self, title):
        """Generate a unique slug from title"""
        if not title:
            return ""
        
        base_slug = slugify(title)
        if not base_slug:
            return ""
            
        slug = base_slug
        counter = 1
        
        while BlogPost.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        return slug
    
    def _get_or_create_category(self, category_input):
        """Get or create category by name or slug"""
        # First try to find by slug
        category = Category.objects.filter(slug=category_input).first()
        if category:
            return category
        
        # Then try by name
        category = Category.objects.filter(name__iexact=category_input).first()
        if category:
            return category
        
        # Create new category
        return Category.objects.create(
            name=category_input,
            slug=slugify(category_input)
        )
    
    def _get_or_create_tag(self, tag_name):
        """Get or create tag by name"""
        tag, created = Tag.objects.get_or_create(
            name__iexact=tag_name,
            defaults={'name': tag_name, 'slug': slugify(tag_name)}
        )
        return tag
    
    def _calculate_read_time(self, content):
        """Calculate estimated read time in minutes"""
        # Remove HTML tags
        text = re.sub('<.*?>', '', content)
        # Average reading speed is 200-250 words per minute
        word_count = len(text.split())
        return max(1, round(word_count / 200))
