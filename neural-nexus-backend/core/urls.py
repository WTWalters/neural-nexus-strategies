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

import logging
import os

from django.conf import settings
from django.contrib import admin
from django.db import connections
from django.db.utils import OperationalError
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

logger = logging.getLogger(__name__)

def health_check(request):
    """Enhanced health check endpoint"""
    logger.info("Health check started")
    logger.info(f"Request host: {request.get_host()}")

    response_data = []
    status_code = 200

    try:
        # Check database connection
        logger.info("Checking database connection...")
        db_config = settings.DATABASES['default']
        # Log non-sensitive database config
        logger.info(f"Database host: {db_config.get('HOST')}")
        logger.info(f"Database name: {db_config.get('NAME')}")

        with connections['default'].cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
            response_data.append("Database: Connected")

        # Check static files
        static_root = getattr(settings, 'STATIC_ROOT', None)
        if static_root and os.path.exists(static_root):
            response_data.append("Static files: OK")
        else:
            response_data.append("Static files: Not configured")
            status_code = 500

        # Add debug info in non-production
        if settings.DEBUG:
            response_data.append(f"ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
            response_data.append(f"DEBUG: {settings.DEBUG}")

        logger.info("Health check completed successfully")
        return HttpResponse(
            "\n".join(response_data),
            content_type="text/plain",
            status=status_code
        )
    except OperationalError as e:
        error_msg = f"Database Error: {str(e)}"
        logger.error(error_msg)
        return HttpResponse(
            error_msg,
            content_type="text/plain",
            status=500
        )
    except Exception as e:
        error_msg = f"Health Check Error: {str(e)}"
        logger.error(error_msg)
        return HttpResponse(
            error_msg,
            content_type="text/plain",
            status=500
        )


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
