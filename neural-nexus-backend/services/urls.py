# services/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ServiceCategoryViewSet, ServiceViewSet
from .test_view import debug_services

router = DefaultRouter()

# Register viewsets with specific paths
router.register(
    r"categories", ServiceCategoryViewSet, basename="service-category"
)

# Register services at the /services/ path
router.register(r"services", ServiceViewSet, basename="service")

# Create urlpatterns with both router URLs and our custom debug view
urlpatterns = [
    # Add the debug endpoint
    path('debug/', debug_services, name='debug-services'),
] + router.urls
