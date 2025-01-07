# Path: neural-nexus-backend/services/views.py

from django.db.models import Max, Min
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Service, ServiceCategory
from .serializers import ServiceCategorySerializer, ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for handling service-related endpoints."""

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
    search_fields = ["name", "description", "features__name", "features__description"]
    ordering_fields = ["name", "base_price", "created_at"]
    ordering = ["base_price"]


def list(self, request, *args, **kwargs):
    print("DEBUG: Received request in ServiceViewSet list method")
    print(f"DEBUG: Request headers: {request.headers}")
    try:
        queryset = self.get_queryset()
        print(f"DEBUG: Found {queryset.count()} active services")
        response = super().list(request, *args, **kwargs)

        # Add CORS headers
        response["Access-Control-Allow-Origin"] = "https://nns-frontend-production.up.railway.app"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response["Access-Control-Allow-Credentials"] = "true"

        print("DEBUG: Response headers:", dict(response.headers))
        return response
    except Exception as e:
        print(f"DEBUG: Error in list view: {str(e)}")
        return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=["get"])
    def metadata(self, request):
        """Provides metadata about available services for frontend filtering/display"""
        try:
            price_range = Service.objects.aggregate(
                min_price=Min("base_price"), max_price=Max("base_price")
            )

            categories = ServiceCategory.objects.values("id", "name", "slug")
            package_types = list(set(Service.objects.values_list("package_type", flat=True)))

            return Response(
                {
                    "price_range": price_range,
                    "categories": categories,
                    "package_types": sorted(package_types),
                    "example_queries": {
                        "price_range": f'/api/services/?base_price_gte={price_range["min_price"]}&base_price_lte={price_range["max_price"]}',
                        "search": "/api/services/?search=AI implementation",
                        "category": "/api/services/?category=1",
                        "package_type": "/api/services/?package_type=ENTERPRISE",
                        "ordering": {
                            "price_low_to_high": "/api/services/?ordering=base_price",
                            "price_high_to_low": "/api/services/?ordering=-base_price",
                            "name": "/api/services/?ordering=name",
                        },
                    },
                }
            )
        except Exception as e:
            print(f"DEBUG: Error in metadata view: {str(e)}")
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=["get"])
    def search_suggestions(self, request):
        """Provides search suggestions based on a query parameter"""
        try:
            query = request.query_params.get("q", "")
            if len(query) < 2:
                return Response([])

            suggestions = Service.objects.filter(name__icontains=query).values_list(
                "name", flat=True
            )[:5]

            return Response(list(suggestions))
        except Exception as e:
            print(f"DEBUG: Error in search_suggestions view: {str(e)}")
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=["get"])
    def by_category(self, request):
        """Returns services grouped by category"""
        try:
            categories = ServiceCategory.objects.all()
            response = []

            for category in categories:
                services = self.get_queryset().filter(category=category)
                services_data = self.get_serializer(services, many=True).data
                if services_data:  # Only include categories with active services
                    response.append(
                        {
                            "category": {
                                "id": category.id,
                                "name": category.name,
                                "slug": category.slug,
                                "description": category.description,
                            },
                            "services": services_data,
                        }
                    )

            return Response(response)
        except Exception as e:
            print(f"DEBUG: Error in by_category view: {str(e)}")
            return Response({"error": str(e)}, status=500)

    @action(detail=True, methods=["get"])
    def similar_services(self, request, slug=None):
        """Returns similar services based on category and price range"""
        try:
            service = self.get_object()
            price_range = (service.base_price * 0.7, service.base_price * 1.3)

            similar = Service.objects.filter(
                category=service.category, base_price__range=price_range, is_active=True
            ).exclude(id=service.id)[:3]

            return Response(self.get_serializer(similar, many=True).data)
        except Exception as e:
            print(f"DEBUG: Error in similar_services view: {str(e)}")
            return Response({"error": str(e)}, status=500)


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for handling service category endpoints."""

    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description"]
    ordering_fields = ["name"]
    ordering = ["name"]

    def list(self, request, *args, **kwargs):
        print("DEBUG: Accessing ServiceCategoryViewSet list method")
        try:
            queryset = self.get_queryset()
            print(f"DEBUG: Found {queryset.count()} categories")
            response = super().list(request, *args, **kwargs)
            response["Access-Control-Allow-Origin"] = (
                "https://nns-frontend-production.up.railway.app"
            )
            response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            return response
        except Exception as e:
            print(f"DEBUG: Error in category list view: {str(e)}")
            return Response({"error": str(e)}, status=500)

    @action(detail=True, methods=["get"])
    def services(self, request, slug=None):
        """Returns all services for a specific category"""
        try:
            category = self.get_object()
            services = Service.objects.filter(category=category, is_active=True)
            serializer = ServiceSerializer(services, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"DEBUG: Error in category services view: {str(e)}")
            return Response({"error": str(e)}, status=500)
