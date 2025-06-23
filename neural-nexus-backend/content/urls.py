# content/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import (
    ABTestViewSet,
    CampaignViewSet,
    LandingPageViewSet,
    TrackingView,
)

router = DefaultRouter()
router.register(r"tags", views.TagViewSet)
router.register(r"categories", views.CategoryViewSet)
router.register(r"posts", views.BlogPostViewSet, basename="blogspot")
router.register(r"analytics", views.BlogAnalyticsViewSet)
router.register(r"resources", views.ResourceViewSet)
router.register(r"lead-magnets", views.LeadMagnetViewSet)
router.register(r"campaigns", CampaignViewSet)
router.register(r"landing-pages", LandingPageViewSet, basename="landingpage")
router.register(r"ab-tests", ABTestViewSet)
router.register(r"case-studies", views.CaseStudyViewSet, basename="casestudy")

# Add the tracking view to urlpatterns
urlpatterns = router.urls + [
    path("tracking/", TrackingView.as_view(), name="tracking"),
    # N8N API endpoints
    path("n8n/", include("content.n8n_urls")),
]
