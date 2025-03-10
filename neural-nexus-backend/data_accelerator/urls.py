from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('dimensions', views.AcceleratorDimensionViewSet)
router.register('maturity-levels', views.AcceleratorMaturityLevelViewSet)
router.register('questions', views.AssessmentQuestionViewSet)
router.register('assessments', views.AssessmentViewSet, basename='assessment')
router.register('data-uploads', views.DataUploadViewSet, basename='data-upload')

urlpatterns = [
    path('', include(router.urls)),
]
