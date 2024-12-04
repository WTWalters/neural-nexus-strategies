# content/admin.py

from django.contrib import admin
from .models import (
    Category, BlogPost, Resource, LeadMagnet,BlogAnalytics,
    Campaign, LandingPage, ABTest, Variant, VariantVisit
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'status', 'is_featured', 'published_at')
    list_filter = ('status', 'category', 'is_featured', 'author')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    ordering = ('-published_at', '-created_at')

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'is_gated', 'download_count')
    list_filter = ('resource_type', 'is_gated')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-created_at',)

@admin.register(LeadMagnet)
class LeadMagnetAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'conversion_rate')
    list_filter = ('is_active',)
    search_fields = ('title', 'description', 'value_proposition')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-created_at',)


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'status', 'start_date', 'end_date', 'created_by']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']

@admin.register(LandingPage)
class LandingPageAdmin(admin.ModelAdmin):
    list_display = ['title', 'campaign', 'is_active', 'created_by']
    list_filter = ['is_active', 'campaign', 'created_at']
    search_fields = ['title', 'meta_title']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']

class VariantInline(admin.TabularInline):
    model = Variant
    extra = 1

@admin.register(ABTest)
class ABTestAdmin(admin.ModelAdmin):
    list_display = ['name', 'landing_page', 'is_active', 'start_date', 'created_by']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [VariantInline]

@admin.register(VariantVisit)
class VariantVisitAdmin(admin.ModelAdmin):
    list_display = ['variant', 'timestamp', 'converted', 'conversion_timestamp']
    list_filter = ['converted', 'timestamp']
    readonly_fields = ['timestamp']
