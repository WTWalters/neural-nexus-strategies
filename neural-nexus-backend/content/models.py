# content/models.py

"""Models for Neural Nexus content management system.

This module contains the database models for managing content including blog posts,
resources, campaigns, and A/B testing functionality.

Models:
    Tag: Content categorization tags
    Category: Content categories
    BlogPost: Blog content entries
    BlogAnalytics: Analytics for blog posts
    Resource: Downloadable content resources
    ResourceDownload: Resource download tracking
    LeadMagnet: Lead generation content
    Campaign: Marketing campaign management
    LandingPage: Campaign landing pages
    ABTest: A/B testing configuration
    Variant: A/B test variants
    VariantVisit: A/B test visit tracking
"""

from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify
from leads.models import NewsletterSubscription  # Add this import at the top


class Tag(models.Model):
    """Content categorization tag model.

    Attributes:
        name (str): The tag name
        slug (str): URL-friendly version of the name
    """

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Automatically generates slug from name if not provided."""
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Category(models.Model):
    """Content category model.

    Attributes:
        name (str): Category name
        slug (str): URL-friendly version of name
        description (str): Category description
    """

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    """Blog post content model.

    Attributes:
        title (str): Post title
        slug (str): URL-friendly title
        author (User): Post author
        category (Category): Post category
        tags (ManyToMany[Tag]): Associated tags
        content (str): Main post content
        status (str): Publication status (DRAFT/PUBLISHED/ARCHIVED)
        is_featured (bool): Featured post flag
        seo_* (str): SEO metadata fields
        published_at (datetime): Publication timestamp
        view_count (int): Number of post views
    """

    STATUS_CHOICES = [("DRAFT", "Draft"), ("PUBLISHED", "Published"), ("ARCHIVED", "Archived")]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag, blank=True)  # Now Tag is defined before use
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    featured_image = models.URLField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="DRAFT")
    is_featured = models.BooleanField(default=False)
    seo_title = models.CharField(max_length=200, blank=True)
    seo_description = models.TextField(blank=True)
    seo_keywords = models.CharField(max_length=500, blank=True)  # New field
    estimated_read_time = models.IntegerField(default=0)  # New field
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    view_count = models.IntegerField(default=0)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title


class BlogAnalytics(models.Model):
    blog_post = models.OneToOneField(BlogPost, on_delete=models.CASCADE, related_name="analytics")
    avg_time_on_page = models.FloatField(default=0)
    bounce_rate = models.FloatField(default=0)
    return_visits = models.IntegerField(default=0)
    social_shares = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "blog analytics"


class Resource(models.Model):
    """Downloadable resource model.

    Attributes:
        title (str): Resource title
        resource_type (str): Type of resource (GUIDE/TEMPLATE/etc.)
        is_gated (bool): Whether resource requires registration
        download_count (int): Number of downloads
        lead_magnet_conversion_rate (Decimal): Conversion rate percentage
    """

    RESOURCE_TYPES = [
        ("GUIDE", "Guide"),
        ("TEMPLATE", "Template"),
        ("WHITEPAPER", "Whitepaper"),
        ("CASE_STUDY", "Case Study"),
        ("TOOLKIT", "Toolkit"),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    tags = models.ManyToManyField(Tag, blank=True)  # New field
    seo_keywords = models.CharField(max_length=500, blank=True)  # New field
    file_url = models.URLField()
    thumbnail_url = models.URLField(blank=True)
    is_gated = models.BooleanField(default=True)
    download_count = models.IntegerField(default=0)
    lead_magnet_conversion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_resource_type_display()})"


class ResourceDownload(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="downloads")
    subscriber = models.ForeignKey(
        NewsletterSubscription,
        on_delete=models.CASCADE,
        related_name="resource_downloads",
        null=True,  # Allow null for non-gated resources
        blank=True,
    )
    email = models.EmailField()
    first_name = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=200, blank=True)
    downloaded_at = models.DateTimeField(auto_now_add=True)
    source_url = models.URLField(blank=True)

    class Meta:
        unique_together = ["email", "resource"]


class LeadMagnet(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    value_proposition = models.TextField()
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    conversion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Campaign(models.Model):
    """Marketing campaign model.

    Attributes:
        name (str): Campaign name
        status (str): Campaign status (DRAFT/ACTIVE/PAUSED/COMPLETED)
        start_date (datetime): Campaign start date
        end_date (datetime): Campaign end date
        created_by (User): Campaign creator
    """

    STATUS_CHOICES = [
        ("DRAFT", "Draft"),
        ("ACTIVE", "Active"),
        ("PAUSED", "Paused"),
        ("COMPLETED", "Completed"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="DRAFT")
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class LandingPage(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="landing_pages")
    content = models.JSONField()  # Stores page structure and content
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class ABTest(models.Model):
    """A/B testing configuration model.

    Attributes:
        landing_page (LandingPage): Associated landing page
        name (str): Test name
        is_active (bool): Test active status
        start_date (datetime): Test start date
        end_date (datetime): Test end date
    """

    landing_page = models.ForeignKey(LandingPage, on_delete=models.CASCADE, related_name="ab_tests")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "A/B Test"
        verbose_name_plural = "A/B Tests"

    def __str__(self):
        return f"{self.name} - {self.landing_page.title}"


class Variant(models.Model):
    """A/B test variant visit tracking model.

    Attributes:
        variant (Variant): The variant being tested
        session_id (str): Visitor session ID
        converted (bool): Whether visit led to conversion
        conversion_timestamp (datetime): When conversion occurred
    """

    ab_test = models.ForeignKey(ABTest, on_delete=models.CASCADE, related_name="variants")
    name = models.CharField(max_length=50)  # A, B, etc.
    content = models.JSONField()  # Variant-specific content
    traffic_percentage = models.IntegerField(default=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.ab_test.name} - Variant {self.name}"


class VariantVisit(models.Model):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name="visits")
    session_id = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    converted = models.BooleanField(default=False)
    conversion_timestamp = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-timestamp"]


class CaseStudyCategory(models.Model):
    """Category model for case studies.

    Replaces the previous hardcoded CATEGORY_CHOICES with a dynamic model
    that can be managed through the admin interface.
    """

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Case Study Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class CaseStudy(models.Model):
    """Case study content model."""

    STATUS_CHOICES = [("DRAFT", "Draft"), ("PUBLISHED", "Published"), ("ARCHIVED", "Archived")]

    # Basic Info
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    industry = models.CharField(max_length=100)
    client_name = models.CharField(max_length=200)
    # Replace the category field
    category = models.ForeignKey(
        CaseStudyCategory,
        on_delete=models.PROTECT,
        null=True,  # Add this temporarily
        blank=True,  # Add this too for consistency
        related_name="case_studies",
        help_text="Primary service category this case study relates to",
    )

    # Content
    challenge = models.TextField()
    solution = models.TextField()
    results = models.JSONField()
    implementation_timeline = models.TextField()
    testimonial = models.TextField(blank=True)

    # Meta Fields
    excerpt = models.TextField(blank=True, help_text="Brief summary for cards and previews")
    featured_image = models.URLField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="DRAFT")
    is_featured = models.BooleanField(default=False)
    view_count = models.IntegerField(default=0)

    # SEO Fields
    seo_title = models.CharField(max_length=200, blank=True)
    seo_description = models.TextField(blank=True)
    seo_keywords = models.CharField(max_length=500, blank=True)

    # Timestamps
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        verbose_name_plural = "Case Studies"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class AcceleratorQuiz(models.Model):
    """Model for AI Data Accelerator quiz responses."""

    email = models.EmailField(blank=True)  # Optional for lead gen
    subscriber = models.ForeignKey(
        "leads.NewsletterSubscription",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="accelerator_quizzes",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    total_score = models.FloatField(null=True)  # 1-5 overall score

    class Meta:
        verbose_name_plural = "Accelerator Quizzes"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Quiz {self.id} - {self.email or 'Anonymous'}"


class DimensionScore(models.Model):
    """Scores for each Accelerator dimension."""

    DIMENSION_CHOICES = [
        ("Data Trust Engine", "Data Trust Engine"),
        ("Data Rulebook", "Data Rulebook"),
        ("AI Power Grid", "AI Power Grid"),
        ("Data Flow Superhighway", "Data Flow Superhighway"),
        ("AI Fuel Factory", "AI Fuel Factory"),
        ("AI Mindset Shift", "AI Mindset Shift"),
        ("AI Deployment Machine", "AI Deployment Machine"),
    ]

    quiz = models.ForeignKey(
        AcceleratorQuiz, on_delete=models.CASCADE, related_name="dimension_scores"
    )
    dimension = models.CharField(max_length=50, choices=DIMENSION_CHOICES)
    score = models.IntegerField()  # 1-5
    answers = models.JSONField()  # e.g., {"q1": 3, "q2": 4, "q3": 2}

    class Meta:
        ordering = ["quiz", "dimension"]
        unique_together = ["quiz", "dimension"]

    def __str__(self):
        return f"{self.dimension} - {self.score}"
