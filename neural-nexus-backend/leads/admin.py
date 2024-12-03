# leads/admin.py

from django.contrib import admin
from .models import (
    Contact,
    Interaction,
    ROICalculation,
    LeadScore,
    NewsletterSubscription  # Add this import
)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'company', 'status', 'created_at')
    list_filter = ('status', 'source', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'company')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Company Information', {
            'fields': ('company', 'company_size', 'industry')
        }),
        ('Lead Information', {
            'fields': ('source', 'status', 'score', 'assigned_to')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'last_contacted'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    list_display = ('contact', 'type', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('contact__first_name', 'contact__last_name', 'description')
    ordering = ('-created_at',)

@admin.register(ROICalculation)
class ROICalculationAdmin(admin.ModelAdmin):
    list_display = (
        'contact',
        'total_annual_savings',
        'roi_percentage',
        'payback_months',
        'created_at'
    )
    list_filter = ('created_at',)
    search_fields = ('contact__first_name', 'contact__last_name')
    date_hierarchy = 'created_at'
    readonly_fields = (
        'projected_time_savings',
        'projected_completion_rate',
        'labor_cost_savings',
        'efficiency_savings',
        'total_annual_savings',
        'roi_percentage',
        'payback_months'
    )

@admin.register(LeadScore)
class LeadScoreAdmin(admin.ModelAdmin):
    list_display = ('contact', 'score_type', 'score', 'reason', 'created_at')
    list_filter = ('score_type',)
    search_fields = ('contact__first_name', 'contact__last_name', 'reason')
    date_hierarchy = 'created_at'

@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'source', 'subscribed_at', 'is_active')
    list_filter = ('source', 'is_active', 'subscribed_at')
    search_fields = ('email', 'first_name')
    readonly_fields = ('subscribed_at', 'ip_address', 'user_agent', 'time_to_signup')

    fieldsets = (
        ('Subscriber Information', {
            'fields': ('first_name', 'email', 'is_active')
        }),
        ('Subscription Details', {
            'fields': ('source', 'subscribed_at')
        }),
        ('Tracking Information', {
            'fields': ('ip_address', 'user_agent', 'time_to_signup'),
            'classes': ('collapse',)
        }),
    )
