# services/serializers.py

from rest_framework import serializers

from .models import Service, ServiceCategory, ServiceDeliverable, ServiceFeature


class ServiceFeatureSerializer(serializers.ModelSerializer):
    """Serializer for service features."""

    class Meta:
        model = ServiceFeature
        fields = ["id", "name", "description", "is_highlighted", "order"]
        ordering = ["order", "name"]


class ServiceDeliverableSerializer(serializers.ModelSerializer):
    """Serializer for service deliverables."""

    class Meta:
        model = ServiceDeliverable
        fields = ["id", "name", "description", "timeline", "order"]
        ordering = ["order", "name"]


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for services with nested features and deliverables."""

    features = ServiceFeatureSerializer(many=True, read_only=True)
    deliverables = ServiceDeliverableSerializer(many=True, read_only=True)
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    package_type_display = serializers.CharField(source="get_package_type_display", read_only=True)

    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "package_type",
            "package_type_display",
            "description",
            "base_price",
            "duration",
            "is_active",
            "features",
            "deliverables",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "created_at", "updated_at"]

    def to_representation(self, instance):
        """Customize the output representation."""
        data = super().to_representation(instance)
        # Sort features and deliverables by order
        data["features"] = sorted(data["features"], key=lambda x: (x["order"], x["name"]))
        data["deliverables"] = sorted(data["deliverables"], key=lambda x: (x["order"], x["name"]))
        return data


class ServiceCategorySerializer(serializers.ModelSerializer):
    """Serializer for service categories with nested services."""

    services = ServiceSerializer(many=True, read_only=True)
    service_count = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "slug", "description", "services", "service_count"]
        read_only_fields = ["slug"]

    def get_service_count(self, obj):
        """Get count of active services in category."""
        return obj.services.filter(is_active=True).count()

    def to_representation(self, instance):
        """Customize the output representation."""
        data = super().to_representation(instance)
        # Only include active services in the response
        data["services"] = [service for service in data["services"] if service["is_active"]]
        return data
