# leads/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ROICalculatorViewSet
# Import your other views here

router = DefaultRouter()
router.register(r'roi-calculator', ROICalculatorViewSet, basename='roi-calculator')

urlpatterns = [
    path('', include(router.urls)),
]
