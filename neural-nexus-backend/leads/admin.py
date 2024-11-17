# leads/admin.py

from django.contrib import admin
from .models import Contact, Interaction, ROICalculation, LeadScore

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'company', 'email', 'status', 'source', 'score', 'created_at')
    list_filter = ('status', 'source', 'is_active')
    search_fields = ('first_name', 'last_name', 'email', 'company')
    date_hierarchy = 'created_at'

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    full_name.short_description = 'Name'

@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    list_display = ('contact', 'type', 'created_by', 'created_at')
    list_filter = ('type', 'created_by')
    search_fields = ('contact__first_name', 'contact__last_name', 'description')
    date_hierarchy = 'created_at'

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
