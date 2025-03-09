# content/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .views import (
    ABTestViewSet,
    CampaignViewSet,
    GetResults,
    LandingPageViewSet,
    SubmitQuiz,  # Add these imports
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
    path("submit-quiz/", SubmitQuiz.as_view(), name="submit-quiz"),
    path("results/<int:quiz_id>/", GetResults.as_view(), name="get-results"),
]
