
#!/usr/bin/env python
# list_urls.py
import os
import sys

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

import django
django.setup()

from django.urls import get_resolver
from django.urls.resolvers import URLPattern, URLResolver

def list_urls(resolver, prefix=''):
    """List all URLs defined in the resolver"""
    for pattern in resolver.url_patterns:
        if isinstance(pattern, URLPattern):
            print(f"{prefix}{pattern.pattern}")
        elif isinstance(pattern, URLResolver):
            print(f"{prefix}{pattern.pattern}")
            list_urls(pattern, prefix + '  ')
        else:
            print(f"Unknown pattern type: {pattern}")

if __name__ == '__main__':
    resolver = get_resolver()
    list_urls(resolver)
