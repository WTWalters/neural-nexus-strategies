# leads/admin.py

from django.contrib import admin
from rangefilter.filters import DateRangeFilter
from .models import (
    Contact,
    Interaction,
    ROICalculation,
    LeadScore,
    NewsletterSubscription,  # Add this import
    Identity, IdentityEmail,
    IdentityDevice
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

@admin.register(Identity)
class IdentityAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'primary_email',
        'is_anonymous',
        'is_verified',
        'first_seen_at',
        'last_seen_at'
    )
    list_display_links = ('id', 'primary_email')  # Add this line
    date_hierarchy = 'first_seen_at'              # Add this line
    list_filter = (
        'is_anonymous',
        'is_verified',
        'marketing_consent',
        'analytics_consent',
        ('first_seen_at', DateRangeFilter),  # Now this should work
        'source_of_first_identification',
    )
    search_fields = (
        'primary_email',
        'anonymous_id',
        'last_ip_address'
    )
    readonly_fields = (
        'id',
        'first_seen_at',
        'last_seen_at',
        'consent_updated_at'
    )
    fieldsets = (
        ('Identity Information', {
            'fields': (
                'primary_email',
                'anonymous_id',
                'current_session_id'
            )
        }),
        ('Status', {
            'fields': (
                'is_anonymous',
                'is_verified',
                'source_of_first_identification'
            )
        }),
        ('Tracking', {
            'fields': (
                'last_ip_address',
                'last_user_agent',
                'first_seen_at',
                'last_seen_at'
            )
        }),
        ('Consent', {
            'fields': (
                'marketing_consent',
                'analytics_consent',
                'consent_updated_at'
            )
        }),
        ('Merge Information', {
            'fields': ('merged_with',)
        })
    )
    actions = ['mark_as_verified', 'reset_consent']

@admin.action(description="Mark selected identities as verified")
def mark_as_verified(self, request, queryset):
    queryset.update(is_verified=True)
    self.message_user(request, f"{queryset.count()} identities marked as verified")

@admin.action(description="Reset consent settings")
def reset_consent(self, request, queryset):
           queryset.update(
               marketing_consent=True,
               analytics_consent=True,
               consent_updated_at=timezone.now()
           )
           self.message_user(request, f"Reset consent for {queryset.count()} identities")

# leads/admin.py - Add with your other admin registrations
@admin.register(IdentityEmail)
class IdentityEmailAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'identity',
        'is_primary',
        'is_verified',
        'first_seen_at',
        'last_used_at'
    )
    list_filter = (
        'is_primary',
        'is_verified',
        ('first_seen_at', DateRangeFilter),
        ('verified_at', DateRangeFilter),
    )
    search_fields = ('email', 'identity__primary_email')
    raw_id_fields = ('identity',)
    readonly_fields = (
        'first_seen_at',
        'last_used_at',
        'verification_sent_at',
        'verified_at'
    )
    fieldsets = (
        ('Email Information', {
            'fields': ('identity', 'email', 'is_primary')
        }),
        ('Verification', {
            'fields': (
                'is_verified',
                'verification_sent_at',
                'verified_at'
            )
        }),
        ('Tracking', {
            'fields': ('first_seen_at', 'last_used_at')
        })
    )

    actions = ['mark_as_verified', 'send_verification_email']

    @admin.action(description="Mark selected emails as verified")
    def mark_as_verified(self, request, queryset):
        for email in queryset:
            email.mark_as_verified()
        self.message_user(request, f"{queryset.count()} emails marked as verified")

    @admin.action(description="Send verification emails")
    def send_verification_email(self, request, queryset):
        for email in queryset:
            email.send_verification()
        self.message_user(
            request,
            f"Verification emails sent to {queryset.count()} addresses"
        )

@admin.register(IdentityDevice)
class IdentityDeviceAdmin(admin.ModelAdmin):
    list_display = (
        'fingerprint_short',
        'identity',
        'first_seen_at',
        'last_seen_at',
        'is_active'
    )
    list_filter = (
        'is_active',
        ('first_seen_at', DateRangeFilter),
        ('last_seen_at', DateRangeFilter),
    )
    search_fields = ('fingerprint', 'identity__primary_email', 'user_agent')
    raw_id_fields = ('identity',)
    readonly_fields = ('first_seen_at', 'last_seen_at')

    def fingerprint_short(self, obj):
        """Display truncated fingerprint"""
        return f"{obj.fingerprint[:8]}..."
    fingerprint_short.short_description = 'Fingerprint'

    def get_queryset(self, request):
        """Optimize admin queries"""
        return super().get_queryset(request).select_related('identity')
