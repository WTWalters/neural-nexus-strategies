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
import sys

from django.conf import settings
from django.contrib import admin
from django.db import connections
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
    """Enhanced health check endpoint with error tracking"""
    # Basic stdout logging in case logger isn't configured
    print("Health check started", file=sys.stderr)

    try:
        # 1. Basic response test
        response_data = ["Health check running"]

        # 2. Environment check
        settings_module = os.getenv("DJANGO_SETTINGS_MODULE", "Not Set")
        response_data.append(f"Settings Module: {settings_module}")

        # 3. Database check
        try:
            with connections["default"].cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
                response_data.append("Database: Connected")
        except Exception as db_err:
            print(f"Database Error: {str(db_err)}", file=sys.stderr)
            response_data.append(f"Database Error: {str(db_err)}")
            return HttpResponse("\n".join(response_data), content_type="text/plain", status=500)

        # 4. Static files check
        static_root = getattr(settings, "STATIC_ROOT", "Not Set")
        response_data.append(f"Static Root: {static_root}")

        # 5. Add request info
        response_data.append(f"Request Host: {request.get_host()}")

        # Success response
        print("Health check successful", file=sys.stderr)
        return HttpResponse("\n".join(response_data), content_type="text/plain", status=200)

    except Exception as e:
        error_msg = f"Health Check Critical Error: {str(e)}"
        print(error_msg, file=sys.stderr)
        return HttpResponse(error_msg, content_type="text/plain", status=500)


urlpatterns = [
    path("health", include("core.health_urls")),
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
    path("health", health_check, name="health_check_no_slash"),
    path("health/", health_check, name="health_check"),
]
