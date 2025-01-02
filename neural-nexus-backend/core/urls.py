# core/urls.py

"""URL Configuration for Neural Nexus Backend.

This module defines the URL routing for the entire application, including admin interface,
API endpoints, and API documentation views.

URLs structure:
    /admin/ - Django admin interface
    /api/ - Base API endpoint for services
    /api/content/ - Content management endpoints
    /api/leads/ - Lead management endpoints
    /api/schema/ - OpenAPI schema
    /api/docs/ - Swagger UI documentation
    /api/redoc/ - ReDoc documentation interface

Note:
    All API endpoints are prefixed with '/api/' for clear separation from admin routes
"""

from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


def health_check(request):
    """Basic health check endpoint"""
    try:
        return HttpResponse("OK", content_type="text/plain", status=200)
    except Exception as e:
        return HttpResponse(str(e), content_type="text/plain", status=500)


urlpatterns = [
    # Django admin interface
    path("admin/", admin.site.urls),
    # API endpoints for different app modules
    path("api/", include("services.urls")),
    path("api/content/", include("content.urls")),
    path("api/leads/", include("leads.urls")),
    # API documentation endpoints
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    # Health check
    path("health/", health_check, name="health_check"),
]
