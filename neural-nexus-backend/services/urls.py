# services/urls.py
from rest_framework.routers import DefaultRouter

from .views import ServiceCategoryViewSet, ServiceViewSet

router = DefaultRouter()
# Register viewsets
router.register(
    r"categories", ServiceCategoryViewSet, basename="service-category"
)  # Register categories first
router.register(r"", ServiceViewSet, basename="service")  # Then the base services

urlpatterns = router.urls


# Let's also modify our view to add a package_types endpoint
# services/views.py
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Service, ServiceCategory
from .serializers import ServiceCategorySerializer, ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = "slug"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = {
        "category": ["exact"],
        "package_type": ["exact", "in"],
        "base_price": ["gte", "lte"],
        "is_active": ["exact"],
    }
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["name", "base_price", "created_at"]
    ordering = ["base_price"]

    @action(detail=False, methods=["get"])
    def package_types(self, request):
        types = Service.objects.values_list("package_type", flat=True).distinct()
        return Response({"package_types": list(types)})


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    lookup_field = "slug"
