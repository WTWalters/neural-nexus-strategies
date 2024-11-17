# services/views.py

from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Min, Max
from .models import ServiceCategory, Service
from .serializers import ServiceCategorySerializer, ServiceSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = {
        'category': ['exact'],
        'package_type': ['exact', 'in'],
        'base_price': ['gte', 'lte'],
        'is_active': ['exact'],
    }
    search_fields = ['name', 'description', 'features__name', 'features__description']
    ordering_fields = ['name', 'base_price', 'created_at']
    ordering = ['base_price']

    @action(detail=False, methods=['get'])
    def metadata(self, request):
        """
        Provides metadata about available services for frontend filtering/display
        """
        price_range = Service.objects.aggregate(
            min_price=Min('base_price'),
            max_price=Max('base_price')
        )

        categories = ServiceCategory.objects.values('id', 'name', 'slug')
        package_types = list(set(Service.objects.values_list('package_type', flat=True)))

        return Response({
            'price_range': price_range,
            'categories': categories,
            'package_types': sorted(package_types),
            'example_queries': {
                'price_range': f'/api/services/?base_price_gte={price_range["min_price"]}&base_price_lte={price_range["max_price"]}',
                'search': '/api/services/?search=AI implementation',
                'category': '/api/services/?category=1',
                'package_type': '/api/services/?package_type=ENTERPRISE',
                'ordering': {
                    'price_low_to_high': '/api/services/?ordering=base_price',
                    'price_high_to_low': '/api/services/?ordering=-base_price',
                    'name': '/api/services/?ordering=name'
                },
                'combined': '/api/services/?package_type=ENTERPRISE&base_price_gte=40000&ordering=-base_price'
            }
        })

    @action(detail=False, methods=['get'])
    def search_suggestions(self, request):
        """
        Provides search suggestions based on a query parameter
        """
        query = request.query_params.get('q', '')
        if len(query) < 2:
            return Response([])

        suggestions = Service.objects.filter(
            name__icontains=query
        ).values_list('name', flat=True)[:5]

        return Response(list(suggestions))

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """
        Returns services grouped by category
        """
        categories = ServiceCategory.objects.all()
        response = []

        for category in categories:
            services = self.get_queryset().filter(category=category)
            services_data = self.get_serializer(services, many=True).data

            response.append({
                'category': {
                    'id': category.id,
                    'name': category.name,
                    'slug': category.slug,
                    'description': category.description
                },
                'services': services_data
            })

        return Response(response)

    @action(detail=True, methods=['get'])
    def similar_services(self, request, slug=None):
        """
        Returns similar services based on category and price range
        """
        service = self.get_object()
        price_range = (service.base_price * 0.7, service.base_price * 1.3)

        similar = Service.objects.filter(
            category=service.category,
            base_price__range=price_range
        ).exclude(id=service.id)[:3]

        return Response(self.get_serializer(similar, many=True).data)

# Add the ServiceCategoryViewSet after your existing ServiceViewSet class
class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name']
    ordering = ['name']

    @action(detail=True, methods=['get'])
    def services(self, request, slug=None):
        """
        Returns all services for a specific category
        """
        category = self.get_object()
        services = Service.objects.filter(category=category, is_active=True)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
