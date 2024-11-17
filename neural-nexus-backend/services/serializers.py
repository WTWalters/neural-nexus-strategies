# services/serializers.py

from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceFeature, ServiceDeliverable

class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['id', 'name', 'description', 'is_highlighted', 'order']

class ServiceDeliverableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDeliverable
        fields = ['id', 'name', 'description', 'timeline', 'order']

class ServiceSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    deliverables = ServiceDeliverableSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'category', 'name', 'slug', 'package_type',
                 'description', 'base_price', 'duration', 'is_active',
                 'features', 'deliverables']

class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'description', 'services']
