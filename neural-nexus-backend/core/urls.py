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
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


def health_check(request):
    """Basic health check endpoint"""
    from django.db import connections

    try:
        # Test database connection
        db_conn = connections['default']
        c = db_conn.cursor()
        c.execute('SELECT 1;')
        row = c.fetchone()
        if row is None:
            raise Exception("DB check failed")

        return JsonResponse({
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.datetime.now().isoformat()
        })
    except Exception as e:
        return JsonResponse({
            "status": "unhealthy",
            "error": str(e)
        }, status=500)


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
