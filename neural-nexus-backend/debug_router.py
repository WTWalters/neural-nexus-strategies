
#!/usr/bin/env python
import os
import sys

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

import django
django.setup()

from django.urls import get_resolver
from rest_framework.routers import DefaultRouter
from services.views import ServiceViewSet, ServiceCategoryViewSet

# Create a test router
router = DefaultRouter()
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"categories", ServiceCategoryViewSet, basename="service-category")

# Print the URLs that would be generated
print("Generated URLs from services router:")
for url in router.urls:
    print(f"- {url}")

# Print actual registered URLs
print("\nActually registered URLs in Django:")
resolver = get_resolver()

def print_urls(resolver, prefix=''):
    for pattern in resolver.url_patterns:
        if hasattr(pattern, 'url_patterns'):
            print(f"{prefix}+ {pattern.pattern}")
            print_urls(pattern, prefix + '  ')
        else:
            print(f"{prefix}- {pattern.pattern} => {pattern.callback}")

print_urls(resolver)

# Test specific URL path
from django.urls import resolve, Resolver404

def test_url(url_path):
    try:
        match = resolve(url_path)
        print(f"\nResolved {url_path} to:")
        print(f"- view: {match.func.__name__ if hasattr(match.func, '__name__') else match.func}")
        print(f"- args: {match.args}")
        print(f"- kwargs: {match.kwargs}")
    except Resolver404:
        print(f"\nCould not resolve {url_path}")

# Test the URLs that should be working
test_url('/api/services/')
test_url('/api/services/services/')
test_url('/api/services/categories/')
