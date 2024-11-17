# content/views.py

from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateTimeFilter
from django.utils import timezone
from django.db.models import Count, Q
from .models import Category, BlogPost, Resource, LeadMagnet, NewsletterSubscriber
from .serializers import (
    CategorySerializer,
    BlogPostSerializer,
    ResourceSerializer,
    LeadMagnetSerializer,
    NewsletterSubscriberSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class BlogPostFilterSet(FilterSet):
    created_after = DateTimeFilter(field_name='created_at', lookup_expr='gte')
    created_before = DateTimeFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = BlogPost
        fields = {
            'category': ['exact'],
            'author': ['exact'],
            'is_featured': ['exact'],
            'status': ['exact'],
        }

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(status='PUBLISHED')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BlogPostFilterSet
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['published_at', 'created_at', 'view_count']
    ordering = ['-published_at']

    @action(detail=False)
    def featured(self, request):
        featured = self.get_queryset().filter(is_featured=True)[:5]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def popular(self, request):
        popular = self.get_queryset().order_by('-view_count')[:5]
        serializer = self.get_serializer(popular, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def related(self, request, slug=None):
        post = self.get_object()
        related = self.get_queryset().filter(
            category=post.category
        ).exclude(id=post.id)[:3]
        serializer = self.get_serializer(related, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def navigation(self, request, slug=None):
        post = self.get_object()
        next_post = self.get_queryset().filter(
            published_at__gt=post.published_at
        ).order_by('published_at').first()
        prev_post = self.get_queryset().filter(
            published_at__lt=post.published_at
        ).order_by('-published_at').first()

        return Response({
            'next': self.get_serializer(next_post).data if next_post else None,
            'previous': self.get_serializer(prev_post).data if prev_post else None
        })

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_count = (instance.view_count or 0) + 1
        instance.save(update_fields=['view_count'])
        return super().retrieve(request, *args, **kwargs)

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['resource_type', 'is_gated']
    search_fields = ['title', 'description']
    ordering_fields = ['download_count', 'created_at']
    ordering = ['-created_at']

    @action(detail=False)
    def popular(self, request):
        popular = self.get_queryset().order_by('-download_count')[:5]
        serializer = self.get_serializer(popular, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def download(self, request, slug=None):
        resource = self.get_object()
        if resource.is_gated and not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required for this resource."},
                status=status.HTTP_403_FORBIDDEN
            )
        resource.download_count += 1
        resource.save(update_fields=['download_count'])
        return Response({"download_url": resource.file_url})

class LeadMagnetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadMagnet.objects.filter(is_active=True)
    serializer_class = LeadMagnetSerializer
    lookup_field = 'slug'


class NewsletterViewSet(viewsets.GenericViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = []  # Allow anonymous subscriptions

    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": "success",
                "message": "Successfully subscribed to newsletter.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def unsubscribe(self, request):
        email = request.data.get('email')
        try:
            subscriber = NewsletterSubscriber.objects.get(email=email)
            subscriber.is_active = False
            subscriber.save()
            return Response({
                "status": "success",
                "message": "Successfully unsubscribed from newsletter."
            })
        except NewsletterSubscriber.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Email not found."
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def resubscribe(self, request):
        email = request.data.get('email')
        try:
            subscriber = NewsletterSubscriber.objects.get(email=email)
            if subscriber.is_active:
                return Response({
                    "status": "error",
                    "message": "Email is already subscribed."
                }, status=status.HTTP_400_BAD_REQUEST)
            subscriber.is_active = True
            subscriber.save()
            return Response({
                "status": "success",
                "message": "Successfully resubscribed to newsletter."
            })
        except NewsletterSubscriber.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Email not found."
            }, status=status.HTTP_404_NOT_FOUND)
