# leads/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ROICalculatorViewSet, ContactFormView, NewsletterSubscriptionView  # Add this import

router = DefaultRouter()
router.register(r'roi-calculator', ROICalculatorViewSet, basename='roi-calculator')

urlpatterns = [
    path('', include(router.urls)),
    path('contact-form/', ContactFormView.as_view(), name='contact_form'),
    path('newsletter/subscribe/', NewsletterSubscriptionView.as_view(), name='newsletter_subscribe'),  # Add this line
]
