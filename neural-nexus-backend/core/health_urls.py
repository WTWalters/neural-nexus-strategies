# core/health_urls.py

from django.http import HttpResponse
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET


@csrf_exempt
@require_GET
def health_check(request):
    """Bare minimum health check endpoint"""
    try:
        from django.db import connections
        with connections['default'].cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
            return HttpResponse("OK", status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

urlpatterns = [
    path('', health_check, name='health_check'),
]
