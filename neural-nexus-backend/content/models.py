# content/models.py

from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('ARCHIVED', 'Archived')
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    featured_image = models.URLField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='DRAFT')
    is_featured = models.BooleanField(default=False)
    seo_title = models.CharField(max_length=200, blank=True)
    seo_description = models.TextField(blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    view_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

class Resource(models.Model):
    RESOURCE_TYPES = [
        ('GUIDE', 'Guide'),
        ('TEMPLATE', 'Template'),
        ('WHITEPAPER', 'Whitepaper'),
        ('CASE_STUDY', 'Case Study'),
        ('TOOLKIT', 'Toolkit')
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    file_url = models.URLField()
    thumbnail_url = models.URLField(blank=True)
    is_gated = models.BooleanField(default=True)
    download_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_resource_type_display()})"

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

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    last_engagement = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
