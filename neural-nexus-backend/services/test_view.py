
# services/test_view.py
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.urls import get_resolver
from .models import Service, ServiceCategory, ServiceFeature, ServiceDeliverable

@require_GET
def debug_services(request):
    """Debug view to return information about the services app"""
    # Get all URLs
    resolver = get_resolver()
    
    def get_urls(resolver, prefix=''):
        urls = []
        for pattern in resolver.url_patterns:
            if hasattr(pattern, 'url_patterns'):
                pattern_urls = get_urls(pattern, prefix + str(pattern.pattern))
                urls.extend(pattern_urls)
            else:
                urls.append({
                    'pattern': prefix + str(pattern.pattern),
                    'name': getattr(pattern, 'name', None),
                    'callback': str(pattern.callback).split(' at ')[0],
                })
        return urls
    
    # Get all services
    services = [{
        'id': service.id,
        'name': service.name,
        'slug': service.slug,
        'category': service.category.name,
        'package_type': service.package_type,
        'features_count': service.features.count(),
        'deliverables_count': service.deliverables.count(),
    } for service in Service.objects.all()]
    
    # Get all categories
    categories = [{
        'id': category.id,
        'name': category.name,
        'slug': category.slug,
        'services_count': category.services.count(),
    } for category in ServiceCategory.objects.all()]
    
    return JsonResponse({
        'status': 'ok',
        'message': 'Services debug information',
        'urls': get_urls(resolver),
        'models': {
            'services_count': len(services),
            'categories_count': len(categories),
            'features_count': ServiceFeature.objects.count(),
            'deliverables_count': ServiceDeliverable.objects.count(),
        },
        'services': services,
        'categories': categories,
    })
