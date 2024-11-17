# content/serializers.py

from rest_framework import serializers
from .models import Category, BlogPost, Resource, LeadMagnet, NewsletterSubscriber

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'author', 'author_name',
            'category', 'category_name', 'content', 'excerpt',
            'featured_image', 'status', 'is_featured',
            'seo_title', 'seo_description', 'published_at',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class ResourceSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'slug', 'description', 'resource_type',
            'file_url', 'thumbnail_url', 'is_gated', 'download_count',
            'created_at', 'updated_at', 'download_url'
        ]
        read_only_fields = ['download_count', 'created_at', 'updated_at']

    def get_download_url(self, obj):
        """Only provide download URL for non-gated content or authenticated users"""
        request = self.context.get('request')
        if not obj.is_gated or (request and request.user.is_authenticated):
            return obj.file_url
        return None

class LeadMagnetSerializer(serializers.ModelSerializer):
    resource = ResourceSerializer()

    class Meta:
        model = LeadMagnet
        fields = [
            'id', 'title', 'slug', 'description', 'value_proposition',
            'resource', 'is_active', 'conversion_rate', 'created_at', 'updated_at'
        ]
        read_only_fields = ['conversion_rate', 'created_at', 'updated_at']

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = [
            'id', 'email', 'first_name', 'is_active',
            'subscribed_at', 'last_engagement'
        ]
        read_only_fields = ['subscribed_at', 'last_engagement']

    def validate_email(self, value):
        """Ensure email is unique and valid"""
        if NewsletterSubscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return value.lower()
