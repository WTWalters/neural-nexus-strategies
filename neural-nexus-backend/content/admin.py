# content/admin.py
"""Django admin configuration for Neural Nexus content management.

This module configures the Django admin interface for content-related models,
providing customized list displays, filters, and search functionality for each model.

Models registered:
    Category: Content categorization
    BlogPost: Blog content management
    Resource: Downloadable resources
    LeadMagnet: Lead generation content
    Campaign: Marketing campaign management
    LandingPage: Campaign landing pages
    ABTest: A/B testing configuration
    VariantVisit: A/B test variant tracking

Typical usage example:
    from django.contrib import admin
    from .models import BlogPost

    @admin.register(BlogPost)
    class BlogPostAdmin(admin.ModelAdmin):
        list_display = ('title', 'author', 'status')
"""

from django.contrib import admin

from .models import (
    ABTest,
    AcceleratorQuiz,  # Add this
    BlogPost,
    Campaign,
    CaseStudy,
    CaseStudyCategory,
    Category,
    DimensionScore,  # Add this
    LandingPage,
    LeadMagnet,
    Resource,
    Variant,
    VariantVisit,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for content categories.

    Attributes:
        list_display: Tuple of fields to display in list view
        prepopulated_fields: Dict mapping field names to their auto-population sources
        search_fields: Tuple of fields available for searching
    """

    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    """Admin configuration for blog posts.

    Provides comprehensive management interface for blog content including
    filtering, searching, and chronological organization.

    Attributes:
        list_display: Fields shown in the list view
        list_filter: Fields available for filtering
        search_fields: Fields included in search functionality
        prepopulated_fields: Automatic slug generation from title
        date_hierarchy: Date-based navigation
        ordering: Default sort order for posts
    """

    list_display = ("title", "author", "category", "status", "is_featured", "published_at")
    list_filter = ("status", "category", "is_featured", "author")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"
    ordering = ("-published_at", "-created_at")


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    """Admin configuration for downloadable resources.

    Manages various types of downloadable content with tracking of access controls
    and download metrics.

    Attributes:
        list_display: Resource information display fields
        list_filter: Filter options for resources
        search_fields: Searchable resource fields
        prepopulated_fields: Automatic slug generation
        ordering: Default sort order by creation date
    """

    list_display = ("title", "resource_type", "is_gated", "download_count")
    list_filter = ("resource_type", "is_gated")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)


@admin.register(LeadMagnet)
class LeadMagnetAdmin(admin.ModelAdmin):
    """Admin configuration for lead generation content.

    Manages lead generation assets and tracks their performance metrics.

    Attributes:
        list_display: Lead magnet information fields
        list_filter: Active status filter
        search_fields: Searchable lead magnet content
        prepopulated_fields: Automatic slug creation
        ordering: Sort by creation date
    """

    list_display = ("title", "is_active", "conversion_rate")
    list_filter = ("is_active",)
    search_fields = ("title", "description", "value_proposition")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    """Admin configuration for marketing campaigns.

    Provides campaign management interface with status tracking and date-based organization.

    Attributes:
        list_display: Campaign information fields
        list_filter: Campaign status and date filters
        search_fields: Campaign search functionality
        prepopulated_fields: Automatic slug generation
        readonly_fields: Timestamp fields that cannot be modified
    """

    list_display = ["name", "status", "start_date", "end_date", "created_by"]
    list_filter = ["status", "created_at"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ["created_at", "updated_at"]


@admin.register(LandingPage)
class LandingPageAdmin(admin.ModelAdmin):
    """Admin configuration for campaign landing pages.

    Manages landing pages associated with marketing campaigns.

    Attributes:
        list_display: Landing page information fields
        list_filter: Status and campaign filters
        search_fields: Page content search fields
        prepopulated_fields: Automatic slug generation
        readonly_fields: Timestamp fields
    """

    list_display = ["title", "campaign", "is_active", "created_by"]
    list_filter = ["is_active", "campaign", "created_at"]
    search_fields = ["title", "meta_title"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["created_at", "updated_at"]


class VariantInline(admin.TabularInline):
    """Inline admin configuration for A/B test variants.

    Allows direct management of variants within the A/B test admin interface.
    """

    model = Variant
    extra = 1


@admin.register(ABTest)
class ABTestAdmin(admin.ModelAdmin):
    """Admin configuration for A/B testing.

    Manages A/B test setup and monitoring with inline variant management.

    Attributes:
        list_display: Test information display fields
        list_filter: Status and date filters
        search_fields: Test search functionality
        readonly_fields: Timestamp fields
        inlines: Related variant management
    """

    list_display = ["name", "landing_page", "is_active", "start_date", "created_by"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["name", "description"]
    readonly_fields = ["created_at", "updated_at"]
    inlines = [VariantInline]


@admin.register(VariantVisit)
class VariantVisitAdmin(admin.ModelAdmin):
    """Admin configuration for A/B test variant visit tracking.

    Tracks and displays visitor interactions with A/B test variants.

    Attributes:
        list_display: Visit tracking information
        list_filter: Conversion and timestamp filters
        readonly_fields: Timestamp field
    """

    list_display = ["variant", "timestamp", "converted", "conversion_timestamp"]
    list_filter = ["converted", "timestamp"]
    readonly_fields = ["timestamp"]


@admin.register(CaseStudyCategory)
class CaseStudyCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_active", "case_count"]
    list_filter = ["is_active"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}

    def case_count(self, obj):
        return obj.case_studies.count()

    case_count.short_description = "Number of Cases"


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "category",
        "industry",
        "client_name",
        "status",
        "is_featured",
        "published_at",
        "view_count",
    ]
    list_filter = ["status", "is_featured", "category", "industry"]
    search_fields = ["title", "client_name", "challenge", "solution"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["view_count", "created_at", "updated_at"]
    fieldsets = (
        ("Basic Information", {"fields": ("title", "slug", "industry", "client_name", "category")}),
        (
            "Content",
            {
                "fields": (
                    "challenge",
                    "solution",
                    "results",
                    "implementation_timeline",
                    "testimonial",
                )
            },
        ),
        (
            "Display Options",
            {"fields": ("excerpt", "featured_image", "status", "is_featured", "published_at")},
        ),
        (
            "SEO",
            {"fields": ("seo_title", "seo_description", "seo_keywords"), "classes": ("collapse",)},
        ),
        (
            "Metrics",
            {"fields": ("view_count", "created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def save_model(self, request, obj, form, change):
        if not change:  # If creating new object
            obj.created_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(AcceleratorQuiz)
class AcceleratorQuizAdmin(admin.ModelAdmin):
    """Admin configuration for AI Data Accelerator quiz responses."""

    list_display = ["id", "email", "total_score", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["email"]
    readonly_fields = ["created_at"]  # Only make timestamp read-only

    def get_dimension_scores(self, obj):
        """Display dimension scores in admin."""
        scores = obj.dimension_scores.all()
        return ", ".join([f"{score.dimension}: {score.score}" for score in scores])

    get_dimension_scores.short_description = "Dimension Scores"


@admin.register(DimensionScore)
class DimensionScoreAdmin(admin.ModelAdmin):
    """Admin configuration for dimension scores."""

    list_display = ["quiz", "dimension", "score"]
    list_filter = ["dimension"]
    search_fields = ["quiz__email", "dimension"]
    raw_id_fields = ["quiz"]  # Adds a lookup widget for quiz selection
