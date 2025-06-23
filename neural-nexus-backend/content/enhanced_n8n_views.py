# content/enhanced_n8n_views.py
"""Enhanced N8N-specific views for advanced blog automation"""

import re
import logging
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.db.models import Q, Count
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
from .models import BlogPost, Category, Tag
from .serializers import BlogPostSerializer
from .n8n_views import N8NPermission

logger = logging.getLogger(__name__)


class EnhancedN8NBlogViewSet(viewsets.ModelViewSet):
    """
    Enhanced ViewSet for n8n automation with advanced features:
    - Content templates and AI integration hooks
    - Bulk operations and batch processing
    - Advanced scheduling and workflow management
    - Analytics and performance tracking
    - Content optimization suggestions
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [N8NPermission]
    lookup_field = 'slug'
    
    @action(detail=False, methods=['post'])
    def create_from_template(self, request):
        """
        Create blog post from predefined templates.
        
        Payload:
        {
            "template": "ai-insights|case-study|how-to|announcement",
            "variables": {
                "title": "Custom Title",
                "topic": "AI Implementation",
                "company": "TechCorp",
                "metric": "40% efficiency gain"
            },
            "category": "AI Strategy",
            "tags": ["ai", "implementation"],
            "status": "DRAFT"
        }
        """
        template_type = request.data.get('template')
        variables = request.data.get('variables', {})
        
        if not template_type:
            return Response(
                {"error": "Template type is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate content from template
        content_data = self._generate_template_content(template_type, variables)
        
        if not content_data:
            return Response(
                {"error": f"Unknown template type: {template_type}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Merge with request data
        blog_data = {
            **content_data,
            'category': request.data.get('category', 'General'),
            'tags': request.data.get('tags', []),
            'status': request.data.get('status', 'DRAFT'),
            'publish_now': request.data.get('publish_now', False)
        }
        
        # Create the blog post using the standard create logic
        mock_request = type('Request', (), {
            'data': blog_data,
            'META': request.META
        })()
        
        return self.create(mock_request)
    
    @action(detail=False, methods=['post'])
    def schedule_posts(self, request):
        """
        Schedule multiple blog posts for future publication.
        
        Payload:
        {
            "posts": [
                {
                    "title": "Post 1",
                    "content": "Content 1",
                    "publish_at": "2025-07-01T10:00:00Z"
                }
            ]
        }
        """
        posts_data = request.data.get('posts', [])
        scheduled_posts = []
        errors = []
        
        for index, post_data in enumerate(posts_data):
            try:
                publish_at = post_data.get('publish_at')
                if publish_at:
                    # Parse the datetime
                    if isinstance(publish_at, str):
                        publish_at = datetime.fromisoformat(publish_at.replace('Z', '+00:00'))
                    
                    # Create as draft and store publish time
                    post_data['status'] = 'DRAFT'
                    post_data['publish_now'] = False
                    post_data['published_at'] = publish_at
                
                # Create the post
                mock_request = type('Request', (), {
                    'data': post_data,
                    'META': request.META
                })()
                
                response = self.create(mock_request)
                if response.status_code == 201:
                    scheduled_posts.append({
                        **response.data,
                        'scheduled_for': publish_at.isoformat() if publish_at else None
                    })
                else:
                    errors.append({
                        'index': index,
                        'title': post_data.get('title', 'Unknown'),
                        'error': response.data
                    })
                    
            except Exception as e:
                errors.append({
                    'index': index,
                    'title': post_data.get('title', 'Unknown'),
                    'error': str(e)
                })
        
        return Response({
            'scheduled': len(scheduled_posts),
            'failed': len(errors),
            'posts': scheduled_posts,
            'errors': errors
        })
    
    @action(detail=False, methods=['get'])
    def content_suggestions(self, request):
        """
        Get content suggestions based on analytics and trends.
        """
        # Get popular tags
        popular_tags = Tag.objects.annotate(
            post_count=Count('blogpost')
        ).filter(post_count__gt=0).order_by('-post_count')[:10]
        
        # Get active categories
        active_categories = Category.objects.annotate(
            post_count=Count('blogpost')
        ).filter(post_count__gt=0).order_by('-post_count')[:5]
        
        # Content ideas based on existing content
        content_gaps = self._identify_content_gaps()
        
        return Response({
            'popular_tags': [{'name': tag.name, 'post_count': tag.post_count} 
                            for tag in popular_tags],
            'active_categories': [{'name': cat.name, 'post_count': cat.post_count} 
                                 for cat in active_categories],
            'content_suggestions': content_gaps,
            'optimal_posting_times': self._get_optimal_posting_times(),
            'trending_topics': self._get_trending_topics()
        })
    
    @action(detail=True, methods=['post'])
    def optimize_content(self, request, slug=None):
        """
        Analyze and optimize existing blog post content.
        """
        post = self.get_object()
        
        optimization_suggestions = {
            'seo_score': self._calculate_seo_score(post),
            'readability_score': self._calculate_readability_score(post),
            'suggestions': self._get_optimization_suggestions(post),
            'recommended_tags': self._suggest_tags(post),
            'related_posts': self._find_related_posts(post)
        }
        
        return Response(optimization_suggestions)
    
    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        """
        Bulk update multiple blog posts.
        
        Payload:
        {
            "filters": {"status": "DRAFT", "category": "AI Strategy"},
            "updates": {"status": "PUBLISHED", "publish_now": true}
        }
        """
        filters = request.data.get('filters', {})
        updates = request.data.get('updates', {})
        
        if not filters:
            return Response(
                {"error": "Filters are required for bulk updates"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Build query
        queryset = BlogPost.objects.all()
        
        # Apply filters
        if 'status' in filters:
            queryset = queryset.filter(status=filters['status'])
        if 'category' in filters:
            if isinstance(filters['category'], str):
                queryset = queryset.filter(
                    Q(category__name__icontains=filters['category']) |
                    Q(category__slug=filters['category'])
                )
        if 'tags' in filters:
            for tag in filters['tags']:
                queryset = queryset.filter(tags__name=tag)
        
        # Apply updates
        updated_count = 0
        updated_posts = []
        
        for post in queryset:
            if 'status' in updates:
                post.status = updates['status']
                if updates.get('publish_now') and updates['status'] == 'PUBLISHED':
                    post.published_at = timezone.now()
            
            if 'category' in updates:
                category = self._get_or_create_category(updates['category'])
                post.category = category
            
            post.save()
            updated_count += 1
            updated_posts.append({
                'id': post.id,
                'title': post.title,
                'slug': post.slug,
                'status': post.status
            })
        
        return Response({
            'updated_count': updated_count,
            'posts': updated_posts
        })
    
    def _generate_template_content(self, template_type, variables):
        """Generate content from templates with variable substitution."""
        templates = {
            'ai-insights': {
                'title': f"AI Insights: {variables.get('topic', 'Latest Developments')}",
                'content': f"""
                <h2>Introduction</h2>
                <p>In today's rapidly evolving technological landscape, {variables.get('topic', 'AI development')} continues to reshape industries and drive innovation.</p>
                
                <h2>Key Insights</h2>
                <ul>
                    <li>Strategic implementation approaches</li>
                    <li>Industry best practices</li>
                    <li>Future implications and trends</li>
                </ul>
                
                <h2>Real-World Applications</h2>
                <p>Companies like {variables.get('company', 'leading organizations')} have seen {variables.get('metric', 'significant improvements')} through strategic AI adoption.</p>
                
                <h2>Conclusion</h2>
                <p>The future of {variables.get('topic', 'AI technology')} holds immense potential for businesses ready to embrace transformation.</p>
                """,
                'excerpt': f"Exploring the latest developments in {variables.get('topic', 'AI technology')} and their impact on business transformation.",
                'seo_title': f"AI Insights: {variables.get('topic', 'Latest Developments')} | Neural Nexus",
                'seo_description': f"Discover key insights about {variables.get('topic', 'AI development')} and how it's transforming businesses worldwide.",
                'estimated_read_time': 3
            },
            'case-study': {
                'title': f"Case Study: {variables.get('company', 'Company')} Success Story",
                'content': f"""
                <h2>Challenge</h2>
                <p>{variables.get('company', 'Our client')} faced significant challenges in {variables.get('challenge', 'operational efficiency')}.</p>
                
                <h2>Solution</h2>
                <p>We implemented a comprehensive {variables.get('solution', 'strategic approach')} that addressed their core needs.</p>
                
                <h2>Results</h2>
                <ul>
                    <li>Achieved {variables.get('metric', '40% improvement')}</li>
                    <li>Reduced operational costs</li>
                    <li>Improved team efficiency</li>
                </ul>
                
                <h2>Key Takeaways</h2>
                <p>This success demonstrates the power of strategic implementation and proper planning.</p>
                """,
                'excerpt': f"How {variables.get('company', 'our client')} achieved {variables.get('metric', 'remarkable results')} through strategic implementation.",
                'seo_title': f"{variables.get('company', 'Company')} Case Study | Neural Nexus",
                'seo_description': f"Learn how {variables.get('company', 'our client')} achieved {variables.get('metric', 'success')} with our strategic approach.",
                'estimated_read_time': 4
            },
            'how-to': {
                'title': f"How to {variables.get('action', 'Implement AI Solutions')}",
                'content': f"""
                <h2>Getting Started</h2>
                <p>Implementing {variables.get('topic', 'AI solutions')} requires careful planning and the right approach.</p>
                
                <h2>Step-by-Step Guide</h2>
                <ol>
                    <li>Assess your current situation</li>
                    <li>Define clear objectives</li>
                    <li>Choose the right tools and technologies</li>
                    <li>Implement gradually</li>
                    <li>Monitor and optimize</li>
                </ol>
                
                <h2>Best Practices</h2>
                <ul>
                    <li>Start with pilot projects</li>
                    <li>Ensure team training</li>
                    <li>Maintain continuous improvement</li>
                </ul>
                
                <h2>Common Pitfalls to Avoid</h2>
                <p>Learn from common mistakes and ensure your implementation success.</p>
                """,
                'excerpt': f"A comprehensive guide to {variables.get('action', 'implementing AI solutions')} effectively.",
                'seo_title': f"How to {variables.get('action', 'Implement AI')} | Step-by-Step Guide",
                'seo_description': f"Learn how to {variables.get('action', 'implement AI solutions')} with our comprehensive step-by-step guide.",
                'estimated_read_time': 5
            }
        }
        
        return templates.get(template_type)
    
    def _get_or_create_category(self, category_input):
        """Get or create category by name or slug (imported from n8n_views)"""
        from .n8n_views import N8NBlogViewSet
        n8n_viewset = N8NBlogViewSet()
        return n8n_viewset._get_or_create_category(category_input)
    
    def _identify_content_gaps(self):
        """Identify content gaps based on existing posts."""
        return [
            "AI Implementation Best Practices",
            "Data Strategy for Small Businesses", 
            "Automation ROI Calculator Guide",
            "Digital Transformation Checklist",
            "Machine Learning for Beginners"
        ]
    
    def _get_optimal_posting_times(self):
        """Get optimal posting times based on analytics."""
        return {
            "best_days": ["Tuesday", "Wednesday", "Thursday"],
            "best_hours": ["9:00 AM", "2:00 PM", "4:00 PM"],
            "timezone": "UTC"
        }
    
    def _get_trending_topics(self):
        """Get trending topics based on recent activity."""
        return [
            "AI Ethics and Governance",
            "Sustainable Technology",
            "Remote Work Optimization",
            "Cybersecurity Best Practices",
            "Cloud Migration Strategies"
        ]
    
    def _calculate_seo_score(self, post):
        """Calculate SEO score for a blog post."""
        score = 0
        
        # Title optimization
        if post.seo_title and len(post.seo_title) >= 30:
            score += 20
        
        # Meta description
        if post.seo_description and 120 <= len(post.seo_description) <= 160:
            score += 20
        
        # Content length
        if len(post.content) >= 1000:
            score += 20
        
        # Keywords
        if post.seo_keywords:
            score += 20
        
        # Featured image
        if post.featured_image:
            score += 20
        
        return min(score, 100)
    
    def _calculate_readability_score(self, post):
        """Calculate readability score using simple metrics."""
        # Remove HTML tags
        text = re.sub('<.*?>', '', post.content)
        
        # Count sentences and words
        sentences = len(re.split(r'[.!?]+', text))
        words = len(text.split())
        
        if sentences == 0:
            return 0
        
        # Simple readability score (lower is better)
        avg_words_per_sentence = words / sentences
        
        if avg_words_per_sentence <= 15:
            return 90  # Excellent
        elif avg_words_per_sentence <= 20:
            return 75  # Good
        elif avg_words_per_sentence <= 25:
            return 60  # Average
        else:
            return 40  # Needs improvement
    
    def _get_optimization_suggestions(self, post):
        """Get optimization suggestions for a blog post."""
        suggestions = []
        
        if not post.seo_title:
            suggestions.append("Add an SEO title for better search visibility")
        
        if not post.seo_description:
            suggestions.append("Add a meta description to improve click-through rates")
        
        if not post.featured_image:
            suggestions.append("Add a featured image to increase engagement")
        
        if len(post.content) < 800:
            suggestions.append("Consider expanding content for better SEO ranking")
        
        if not post.excerpt:
            suggestions.append("Add an excerpt for better social media sharing")
        
        return suggestions
    
    def _suggest_tags(self, post):
        """Suggest relevant tags based on post content."""
        # Simple keyword extraction from content
        content_lower = post.content.lower()
        
        potential_tags = []
        keywords = ['ai', 'automation', 'strategy', 'data', 'digital', 'technology', 'business']
        
        for keyword in keywords:
            if keyword in content_lower:
                potential_tags.append(keyword)
        
        # Limit to 5 suggestions
        return potential_tags[:5]
    
    def _find_related_posts(self, post):
        """Find related posts based on category and tags."""
        related = BlogPost.objects.filter(
            category=post.category,
            status='PUBLISHED'
        ).exclude(id=post.id)[:3]
        
        return [{'title': p.title, 'slug': p.slug} for p in related]