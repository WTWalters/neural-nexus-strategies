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

from django.contrib import admin  # Add this import at the top
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


def health_check(request):
    """
    Basic health check endpoint
    """
    try:
        # Check database
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()

        # Check auth system
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user_count = User.objects.count()

        return JsonResponse({
            "status": "healthy",
            "database": "connected",
            "users_count": user_count
        })
    except Exception as e:
        return JsonResponse({
            "status": "unhealthy",
            "error": str(e)
        }, status=500)


@csrf_exempt
def test_auth(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        return JsonResponse(
            {
                "authenticated": user is not None,
                "is_staff": user.is_staff if user else None,
                "is_superuser": user.is_superuser if user else None,
                "username": username,
                "password_length": len(password) if password else 0,
            }
        )
    return JsonResponse({"error": "Method not allowed"}, status=405)


urlpatterns = [
    # Django admin interface
    path("admin/", admin.site.urls),
    # API endpoints for different app modules
    path("api/", include("services.urls")),
    path("api/content/", include("content.urls")),  # Add this line
    path("api/leads/", include("leads.urls")),  # Add this line
    # API documentation endpoints
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("health/", health_check, name="health_check"),
    path("test-auth/", test_auth, name="test-auth"),
]
