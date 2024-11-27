# content/serializers.py

from rest_framework import serializers
from .models import (
    BlogPost, Category, Tag, BlogAnalytics, Resource,
    ResourceDownload, LeadMagnet, NewsletterSubscriber
)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']
        read_only_fields = ['slug']

class BlogAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogAnalytics
        fields = [
            'id', 'blog_post', 'avg_time_on_page', 'bounce_rate',
            'return_visits', 'social_shares', 'last_updated'
        ]
        read_only_fields = ['last_updated']
        extra_kwargs = {'blog_post': {'required': False}}

    def update(self, instance, validated_data):
        # Handle partial updates for analytics
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

class BlogPostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    analytics = BlogAnalyticsSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'author', 'category', 'category_id',
            'tags', 'tag_ids', 'content', 'excerpt', 'featured_image',
            'status', 'is_featured', 'seo_title', 'seo_description',
            'seo_keywords', 'estimated_read_time', 'published_at',
            'created_at', 'updated_at', 'view_count', 'analytics'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at', 'view_count']

    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        blog_post = super().create(validated_data)
        blog_post.tags.set(tag_ids)
        return blog_post

    def update(self, instance, validated_data):
        tag_ids = validated_data.pop('tag_ids', None)
        blog_post = super().update(instance, validated_data)
        if tag_ids is not None:
            blog_post.tags.set(tag_ids)
        return blog_post

class ResourceDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceDownload
        fields = [
            'id', 'resource', 'subscriber', 'email', 'first_name',
            'company', 'downloaded_at', 'source_url', 'converted_to_subscriber'
        ]
        read_only_fields = ['downloaded_at', 'converted_to_subscriber', 'subscriber']

class ResourceSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    download_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'slug', 'description', 'resource_type',
            'tags', 'tag_ids', 'seo_keywords', 'file_url', 'thumbnail_url',
            'is_gated', 'download_count', 'lead_magnet_conversion_rate',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'download_count', 'created_at', 'updated_at']

    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        resource = super().create(validated_data)
        resource.tags.set(tag_ids)
        return resource

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    interests = TagSerializer(many=True, read_only=True)
    interest_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    downloaded_resources = ResourceSerializer(many=True, read_only=True)

    class Meta:
        model = NewsletterSubscriber
        fields = [
            'id', 'email', 'first_name', 'is_active', 'source',
            'interests', 'interest_ids', 'downloaded_resources',
            'subscribed_at', 'last_engagement'
        ]
        read_only_fields = ['subscribed_at', 'last_engagement']

    def create(self, validated_data):
        interest_ids = validated_data.pop('interest_ids', [])
        subscriber = super().create(validated_data)
        subscriber.interests.set(interest_ids)
        return subscriber

class LeadMagnetSerializer(serializers.ModelSerializer):
    resource = ResourceSerializer(read_only=True)
    resource_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = LeadMagnet
        fields = [
            'id', 'title', 'slug', 'description', 'value_proposition',
            'resource', 'resource_id', 'is_active', 'conversion_rate',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'conversion_rate', 'created_at', 'updated_at']
