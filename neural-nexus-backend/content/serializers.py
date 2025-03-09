# content/serializers.py

"""Serializers for Neural Nexus content management system.

This module contains serializers for converting content models to/from JSON,
handling data validation, and managing nested relationships between models.

Serializers:
    TagSerializer: Handles content tags
    CategorySerializer: Manages content categories
    BlogPostSerializer: Processes blog post content with related data
    ResourceSerializer: Handles downloadable resources
    LeadMagnetSerializer: Manages lead generation content
    CampaignSerializer: Handles marketing campaigns
    LandingPageSerializer: Processes campaign landing pages
    ABTestSerializer: Manages A/B testing configurations
"""

from rest_framework import serializers

from .models import (
    ABTest,
    AcceleratorQuiz,
    BlogAnalytics,
    BlogPost,
    Campaign,
    CaseStudy,
    CaseStudyCategory,
    Category,
    DimensionScore,
    LandingPage,
    LeadMagnet,
    Resource,
    ResourceDownload,
    Tag,
    Variant,
    VariantVisit,
)


class TagSerializer(serializers.ModelSerializer):
    """Serializer for content tags.

    Attributes:
        id (int): Tag identifier
        name (str): Tag name
        slug (str): URL-friendly version of name (read-only)
    """

    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]
        read_only_fields = ["slug"]


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for blog posts with nested relationships.

    Handles creation and updating of blog posts including related
    categories, tags, and analytics data.

    Attributes:
        category (CategorySerializer): Nested category data
        category_id (int): Category identifier for write operations
        tags (TagSerializer): List of associated tags
        tag_ids (list): Tag IDs for write operations
        analytics (BlogAnalyticsSerializer): Associated analytics data

    Methods:
        create: Handles blog post creation with related tags
        update: Updates blog post and manages tag relationships
    """

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description"]
        read_only_fields = ["slug"]


class BlogAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogAnalytics
        fields = [
            "id",
            "blog_post",
            "avg_time_on_page",
            "bounce_rate",
            "return_visits",
            "social_shares",
            "last_updated",
        ]
        read_only_fields = ["last_updated"]
        extra_kwargs = {"blog_post": {"required": False}}

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
        child=serializers.IntegerField(), write_only=True, required=False
    )
    analytics = BlogAnalyticsSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "slug",
            "author",
            "category",
            "category_id",
            "tags",
            "tag_ids",
            "content",
            "excerpt",
            "featured_image",
            "status",
            "is_featured",
            "seo_title",
            "seo_description",
            "seo_keywords",
            "estimated_read_time",
            "published_at",
            "created_at",
            "updated_at",
            "view_count",
            "analytics",
        ]
        read_only_fields = ["slug", "created_at", "updated_at", "view_count"]

    def create(self, validated_data):
        """Creates a blog post with associated tags.

        Args:
            validated_data: Validated data from request

        Returns:
            BlogPost: Created blog post instance with tags
        """
        tag_ids = validated_data.pop("tag_ids", [])
        blog_post = super().create(validated_data)
        blog_post.tags.set(tag_ids)
        return blog_post

    def update(self, instance, validated_data):
        tag_ids = validated_data.pop("tag_ids", None)
        blog_post = super().update(instance, validated_data)
        if tag_ids is not None:
            blog_post.tags.set(tag_ids)
        return blog_post


class ResourceDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceDownload
        fields = [
            "id",
            "resource",
            "subscriber",
            "email",
            "first_name",
            "company",
            "downloaded_at",
            "source_url",
        ]
        read_only_fields = ["downloaded_at", "subscriber"]


class ResourceSerializer(serializers.ModelSerializer):
    """Serializer for downloadable resources.

    Handles resource creation and updating with associated tags
    and download tracking.

    Attributes:
        tags (TagSerializer): Associated resource tags
        tag_ids (list): Tag IDs for write operations
        download_count (int): Number of resource downloads (read-only)
    """

    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    download_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Resource
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "resource_type",
            "tags",
            "tag_ids",
            "seo_keywords",
            "file_url",
            "thumbnail_url",
            "is_gated",
            "download_count",
            "lead_magnet_conversion_rate",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "download_count", "created_at", "updated_at"]

    def create(self, validated_data):
        tag_ids = validated_data.pop("tag_ids", [])
        resource = super().create(validated_data)
        resource.tags.set(tag_ids)
        return resource


class LeadMagnetSerializer(serializers.ModelSerializer):
    resource = ResourceSerializer(read_only=True)
    resource_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = LeadMagnet
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "value_proposition",
            "resource",
            "resource_id",
            "is_active",
            "conversion_rate",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "conversion_rate", "created_at", "updated_at"]


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "status",
            "start_date",
            "end_date",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_by", "created_at", "updated_at"]


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = ["id", "name", "content", "traffic_percentage"]


class ABTestSerializer(serializers.ModelSerializer):
    """Serializer for A/B testing configuration.

    Manages A/B test setup including variants and tracking data.

    Attributes:
        variants (VariantSerializer): List of test variants
        landing_page (int): Associated landing page ID
    """

    variants = VariantSerializer(many=True, read_only=True)

    class Meta:
        model = ABTest
        fields = [
            "id",
            "name",
            "description",
            "landing_page",
            "start_date",
            "end_date",
            "is_active",
            "created_by",
            "variants",
        ]
        read_only_fields = ["created_by"]


class LandingPageSerializer(serializers.ModelSerializer):
    ab_tests = ABTestSerializer(many=True, read_only=True)

    class Meta:
        model = LandingPage
        fields = [
            "id",
            "title",
            "slug",
            "campaign",
            "content",
            "meta_title",
            "meta_description",
            "is_active",
            "created_by",
            "created_at",
            "updated_at",
            "ab_tests",
        ]
        read_only_fields = ["created_by", "created_at", "updated_at"]


class VariantVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantVisit
        fields = ["id", "variant", "session_id", "timestamp", "converted", "conversion_timestamp"]
        read_only_fields = ["timestamp"]


class CaseStudyCategorySerializer(serializers.ModelSerializer):
    """Serializer for case study categories."""

    case_count = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudyCategory
        fields = ["id", "name", "slug", "description", "case_count"]
        read_only_fields = ["slug"]

    def get_case_count(self, obj):
        return obj.case_studies.filter(status="PUBLISHED").count()


class CaseStudySerializer(serializers.ModelSerializer):
    """Serializer for case studies with nested category data."""

    category = CaseStudyCategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CaseStudy
        fields = [
            "id",
            "title",
            "slug",
            "industry",
            "client_name",
            "category",
            "category_id",
            "challenge",
            "solution",
            "results",
            "implementation_timeline",
            "testimonial",
            "excerpt",
            "featured_image",
            "status",
            "is_featured",
            "view_count",
            "seo_title",
            "seo_description",
            "seo_keywords",
            "published_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "view_count", "created_at", "updated_at"]


class DimensionScoreSerializer(serializers.ModelSerializer):
    """Serializer for Accelerator dimension scores."""

    class Meta:
        model = DimensionScore
        fields = ["dimension", "score", "answers"]


class AcceleratorQuizSerializer(serializers.ModelSerializer):
    """Serializer for AI Data Accelerator quiz responses."""

    dimension_scores = DimensionScoreSerializer(many=True, read_only=True)
    email = serializers.EmailField(required=False, allow_blank=True)

    class Meta:
        model = AcceleratorQuiz
        fields = ["id", "email", "total_score", "dimension_scores", "created_at"]
        read_only_fields = ["id", "total_score", "dimension_scores", "created_at"]

    def create(self, validated_data):
        """Creates quiz response and calculates total score."""
        quiz = AcceleratorQuiz.objects.create(**validated_data)
        return quiz

    def update(self, instance, validated_data):
        """Updates quiz response and recalculates total score if needed."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DimensionScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = DimensionScore
        fields = ["dimension", "score", "answers"]


class AcceleratorQuizSerializer(serializers.ModelSerializer):
    dimension_scores = DimensionScoreSerializer(many=True, read_only=True)
    email = serializers.EmailField(required=False, allow_blank=True)

    class Meta:
        model = AcceleratorQuiz
        fields = ["id", "email", "total_score", "dimension_scores", "created_at"]
        read_only_fields = ["id", "total_score", "dimension_scores", "created_at"]
