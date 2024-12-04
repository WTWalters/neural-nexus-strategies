# content/views.py

import django_filters

from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateTimeFilter
from django.utils import timezone
from django.db.models import Count, Q, Sum, Avg
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import (
    Category, BlogPost, Resource, LeadMagnet,
    Tag, BlogAnalytics, ResourceDownload,Campaign,
    LandingPage, ABTest, Variant, VariantVisit
)
from .serializers import (
    CategorySerializer, BlogPostSerializer, ResourceSerializer,
    LeadMagnetSerializer, TagSerializer, BlogAnalyticsSerializer,
    CampaignSerializer, LandingPageSerializer,
    ABTestSerializer, VariantSerializer, VariantVisitSerializer
)
# Add this import if not already present
from leads.models import NewsletterSubscription

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class BlogPostFilterSet(FilterSet):
    created_after = DateTimeFilter(field_name='created_at', lookup_expr='gte')
    created_before = DateTimeFilter(field_name='created_at', lookup_expr='lte')
    category = django_filters.CharFilter(field_name='category__slug')  # Change this line

    class Meta:
        model = BlogPost
        fields = {
            'author': ['exact'],
            'is_featured': ['exact'],
            'status': ['exact'],
        }

def get_queryset(self):
    queryset = BlogPost.objects.filter(status='PUBLISHED')

    # Handle category filtering
    category_slug = self.request.query_params.get('category')
    if category_slug:
        queryset = queryset.filter(category__slug=category_slug)
        print(f"Filtering by category: {category_slug}")  # Debug print
        print(f"Found {queryset.count()} posts in category")  # Debug print

    # Handle search filtering
    search_query = self.request.query_params.get('search', None)
    if search_query:
        queryset = queryset.filter(
            Q(title__icontains=search_query) |
            Q(content__icontains=search_query) |
            Q(excerpt__icontains=search_query) |
            Q(category__name__icontains=search_query)
        )
        print(f"Search query: {search_query}")  # Debug print
        print(f"Found {queryset.count()} matching posts")  # Debug print

    return queryset.order_by('-published_at')


    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        print(f"Found {queryset.count()} published blog posts")  # Debug print
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# Add this after BlogPostFilterSet class in views.py

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BlogPostFilterSet
    search_fields = ['^title', 'content', 'excerpt', 'category__name']
    ordering_fields = ['published_at', 'created_at', 'view_count']
    ordering = ['-published_at']

    def get_queryset(self):
        queryset = BlogPost.objects.filter(status='PUBLISHED')

        # Handle category filtering
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            print(f"Filtering by category: {category_slug}")  # Debug print
            print(f"Found {queryset.count()} posts in category")  # Debug print

        # Handle search filtering
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(content__icontains=search_query) |
                Q(excerpt__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )
            print(f"Search query: {search_query}")  # Debug print
            print(f"Found {queryset.count()} matching posts")  # Debug print

        return queryset.order_by('-published_at')

    def list(self, request, *args, **kwargs):
        """
        List blog posts and verify count
        """
        queryset = self.get_queryset()
        print(f"Found {queryset.count()} published blog posts")  # Debug print
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    lookup_field = 'slug'
    permission_classes = []  # Allow anonymous downloads

    @action(detail=True, methods=['post'])
    def download(self, request, slug=None):
        resource = self.get_object()
        email = request.data.get('email')

        if resource.is_gated and not email:
            return Response(
                {"detail": "Email required for gated content."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if email:
            # Create or update subscriber using the leads app model
            subscriber, created = NewsletterSubscription.objects.get_or_create(
                email=email,
                defaults={
                    'first_name': request.data.get('first_name', ''),
                    'source': 'CONTENT_END'
                }
            )

            # Create download record
            download = ResourceDownload.objects.create(
                resource=resource,
                email=email,
                first_name=request.data.get('first_name', ''),
                company=request.data.get('company', ''),
                source_url=request.META.get('HTTP_REFERER', '')
            )

            # Update resource download count
            resource.download_count = (resource.download_count or 0) + 1
            resource.save(update_fields=['download_count'])

            return Response({
                "download_url": resource.file_url,
                "subscriber_created": created
            })

        # For non-gated resources
        resource.download_count = (resource.download_count or 0) + 1
        resource.save(update_fields=['download_count'])
        return Response({
            "download_url": resource.file_url
        })
class LeadMagnetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadMagnet.objects.filter(is_active=True)
    serializer_class = LeadMagnetSerializer
    lookup_field = 'slug'



class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'

    @action(detail=True)
    def content(self, request, slug=None):
        tag = self.get_object()
        return Response({
            'blog_posts': BlogPostSerializer(
                tag.blogpost_set.filter(status='PUBLISHED'),
                many=True,
                context={'request': request}
            ).data,
            'resources': ResourceSerializer(
                tag.resource_set.all(),
                many=True,
                context={'request': request}
            ).data
        })

class BlogAnalyticsViewSet(viewsets.ModelViewSet):
    queryset = BlogAnalytics.objects.all()
    serializer_class = BlogAnalyticsSerializer
    permission_classes = []  # Allow anonymous analytics tracking

    def create(self, request, *args, **kwargs):
        blog_post_id = request.data.get('blog_post')
        try:
            blog_post = BlogPost.objects.get(id=blog_post_id)
            analytics, created = BlogAnalytics.objects.get_or_create(blog_post=blog_post)

            time_on_page = request.data.get('time_on_page')
            if time_on_page:
                # Calculate new average time on page
                new_avg = (
                    (analytics.avg_time_on_page * analytics.return_visits + float(time_on_page))
                    / (analytics.return_visits + 1)
                ) if analytics.avg_time_on_page else float(time_on_page)

                analytics.avg_time_on_page = new_avg
                analytics.return_visits += 1

                is_bounce = request.data.get('is_bounce', False)
                if is_bounce:
                    analytics.bounce_rate = (
                        (analytics.bounce_rate * (analytics.return_visits - 1) + 1)
                        / analytics.return_visits
                    ) if analytics.bounce_rate else 1

                analytics.save()

            serializer = self.get_serializer(analytics)
            status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
            return Response(serializer.data, status=status_code)

        except BlogPost.DoesNotExist:
            return Response(
                {"detail": "Blog post not found."},
                status=status.HTTP_404_NOT_FOUND
            )

class CampaignViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Campaign.objects.all()
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status.upper())
        return queryset

class LandingPageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LandingPageSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return LandingPage.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Handle A/B test variant selection
        variant = self._get_or_assign_variant(instance, request.session)

        if variant:
            # Track the visit
            VariantVisit.objects.create(
                variant=variant,
                session_id=request.session.session_key
            )
            # Use variant content
            serializer = self.get_serializer(instance)
            data = serializer.data
            data['content'] = variant.content
            return Response(data)

        # No A/B test, return normal content
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def _get_or_assign_variant(self, landing_page, session):
        active_test = ABTest.objects.filter(
            landing_page=landing_page,
            is_active=True,
            start_date__lte=timezone.now(),
            end_date__isnull=True
        ).first()

        if not active_test:
            return None

        # Check if variant is already assigned to this session
        session_key = f'ab_test_{active_test.id}'
        variant_id = session.get(session_key)

        if variant_id:
            try:
                return Variant.objects.get(id=variant_id)
            except Variant.DoesNotExist:
                pass

        # Assign new variant based on traffic distribution
        variants = list(active_test.variants.all())
        if not variants:
            return None

        # Simple random distribution based on traffic_percentage
        import random
        total = sum(v.traffic_percentage for v in variants)
        r = random.uniform(0, total)
        cumulative = 0
        for variant in variants:
            cumulative += variant.traffic_percentage
            if r <= cumulative:
                session[session_key] = variant.id
                return variant

        return variants[0]  # Fallback to first variant

class ABTestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ABTest.objects.filter(is_active=True)
    serializer_class = ABTestSerializer

    @action(detail=True, methods=['post'])
    def record_conversion(self, request, pk=None):
        test = self.get_object()
        variant_id = request.session.get(f'ab_test_{test.id}')

        if not variant_id:
            return Response(
                {'error': 'No variant assigned'},
                status=status.HTTP_400_BAD_REQUEST
            )

        visit = VariantVisit.objects.filter(
            variant_id=variant_id,
            session_id=request.session.session_key,
            converted=False
        ).first()

        if visit:
            visit.converted = True
            visit.conversion_timestamp = timezone.now()
            visit.save()

        return Response({'status': 'conversion recorded'})
