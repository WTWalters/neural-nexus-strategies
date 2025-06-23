"""N8N-specific URL patterns"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .n8n_views import N8NBlogViewSet

router = DefaultRouter()
router.register(r'posts', N8NBlogViewSet, basename='n8n-blog')

urlpatterns = router.urls
