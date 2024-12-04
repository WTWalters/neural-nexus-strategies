# content/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import(
    CampaignViewSet, LandingPageViewSet, ABTestViewSet,
)

router = DefaultRouter()
router.register(r'tags', views.TagViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.BlogPostViewSet, basename='blogspot')
router.register(r'analytics', views.BlogAnalyticsViewSet)
router.register(r'resources', views.ResourceViewSet)
router.register(r'lead-magnets', views.LeadMagnetViewSet)
router.register(r'campaigns', CampaignViewSet)
router.register(r'landing-pages', LandingPageViewSet, basename='landingpage')
router.register(r'ab-tests', ABTestViewSet)

urlpatterns = router.urls

# core/urls.py
# Add to your existing urls.py:
#path('api/content/', include('content.urls')),
