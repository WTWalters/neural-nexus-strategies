
# debug.py
from django.core.management import execute_from_command_line
import os
import sys

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
import django
django.setup()

# Import URL resolver
from django.urls import get_resolver
resolver = get_resolver()

# Print all URL patterns
def show_urls(urlpatterns, depth=0):
    for pattern in urlpatterns:
        print(' ' * depth, pattern.pattern)
        if hasattr(pattern, 'url_patterns'):
            show_urls(pattern.url_patterns, depth + 2)

show_urls(resolver.url_patterns)
