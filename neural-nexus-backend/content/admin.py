# content/admin.py

from django.contrib import admin
from .models import Category, BlogPost, Resource, LeadMagnet

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
