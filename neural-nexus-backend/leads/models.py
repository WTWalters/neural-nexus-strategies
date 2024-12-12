# leads/models.py

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
import uuid
from typing import Optional, List
from django.db.models import Manager

class Contact(models.Model):
    LEAD_SOURCES = [
        ('WEBSITE', 'Website Form'),
        ('BLOG', 'Blog Subscription'),
        ('RESOURCE', 'Resource Download'),
        ('REFERRAL', 'Referral'),
        ('SOCIAL', 'Social Media'),
        ('OTHER', 'Other')
    ]

    LEAD_STATUS = [
        ('NEW', 'New'),
        ('CONTACTED', 'Contacted'),
        ('QUALIFIED', 'Qualified'),
        ('PROPOSAL', 'Proposal Sent'),
        ('NEGOTIATION', 'In Negotiation'),
        ('WON', 'Won'),
        ('LOST', 'Lost'),
        ('INACTIVE', 'Inactive')
    ]

    # Identity Management
    identity = models.OneToOneField(
        'Identity',
        on_delete=models.PROTECT,  # Prevent deletion of contacts through identity
        null=True,  # Allow null for migration
        blank=True,
        related_name='contact'
    )
    # Basic Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    company = models.CharField(max_length=200)
    job_title = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)

    # Lead Information
    source = models.CharField(max_length=50, choices=LEAD_SOURCES, default='WEBSITE')
    status = models.CharField(max_length=50, choices=LEAD_STATUS, default='NEW')
    score = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    assigned_to = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    # Company Information
    company_size = models.CharField(max_length=50, blank=True)
    industry = models.CharField(max_length=100, blank=True)
    annual_revenue = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)

    # Tracking
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_contacted = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.company}"

class Interaction(models.Model):
    INTERACTION_TYPES = [
        ('EMAIL', 'Email'),
        ('CALL', 'Phone Call'),
        ('MEETING', 'Meeting'),
        ('DOWNLOAD', 'Resource Download'),
        ('FORM', 'Form Submission'),
        ('OTHER', 'Other')
    ]

    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='interactions')
    type = models.CharField(max_length=50, choices=INTERACTION_TYPES)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.contact} - {self.type} - {self.created_at.date()}"

# Update the ROICalculation model

# Update the ROICalculation model

class ROICalculation(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='roi_calculations')

    # Company Size Metrics
    annual_revenue = models.DecimalField(max_digits=15, decimal_places=2)
    data_team_size = models.IntegerField(help_text="Number of data team members")
    avg_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Average annual salary per data team member",
        null=True,  # Make nullable
        blank=True
    )

    # Current State Metrics
    manual_hours_weekly = models.IntegerField(
        help_text="Hours spent weekly on manual data tasks",
        null=True,  # Make nullable
        blank=True
    )
    report_turnaround_days = models.IntegerField(
        help_text="Average days to generate and deliver reports",
        null=True,  # Make nullable
        blank=True
    )
    completion_rate = models.IntegerField(
        help_text="Percentage of data initiatives completed on schedule",
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,  # Make nullable
        blank=True
    )
    data_request_backlog = models.IntegerField(
        help_text="Number of pending data requests",
        null=True,  # Make nullable
        blank=True
    )

    # Cost Metrics
    current_tools_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Annual spending on data tools and infrastructure",
        null=True,  # Make nullable
        blank=True
    )

    # Calculated Improvements
    projected_time_savings = models.IntegerField(
        help_text="Projected weekly hours saved",
        null=True
    )
    projected_completion_rate = models.IntegerField(
        help_text="Projected initiative completion rate",
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True
    )

    # ROI Results
    labor_cost_savings = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        help_text="Annual savings from reduced manual work",
        null=True
    )
    efficiency_savings = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        help_text="Annual savings from improved efficiency",
        null=True
    )
    total_annual_savings = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        null=True
    )
    roi_percentage = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True
    )
    payback_months = models.IntegerField(null=True)

    # Tracking
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_roi(self):
        # Calculate hourly rate
        yearly_hours = 52 * 40  # 52 weeks * 40 hours
        hourly_rate = self.avg_salary / yearly_hours

        # Time savings calculation
        self.projected_time_savings = int(self.manual_hours_weekly * 0.6)  # 60% reduction in manual tasks
        annual_hours_saved = self.projected_time_savings * 52  # yearly savings

        # Labor cost savings
        self.labor_cost_savings = annual_hours_saved * hourly_rate * self.data_team_size

        # Efficiency improvement
        self.projected_completion_rate = min(95, self.completion_rate + 30)  # 30% improvement, max 95%
        completion_rate_improvement = self.projected_completion_rate - self.completion_rate

        # Efficiency savings (based on faster delivery and higher completion rate)
        revenue_impact_rate = 0.001  # 0.1% of revenue per 1% improvement in completion rate
        self.efficiency_savings = self.annual_revenue * (completion_rate_improvement * revenue_impact_rate)

        # Total savings and ROI
        implementation_cost = self.current_tools_cost * 1.5  # Estimated implementation cost
        self.total_annual_savings = self.labor_cost_savings + self.efficiency_savings
        self.roi_percentage = (self.total_annual_savings / implementation_cost) * 100
        self.payback_months = int((implementation_cost / self.total_annual_savings) * 12)

        self.save()

        return {
            'time_savings_weekly': self.projected_time_savings,
            'completion_rate_improvement': completion_rate_improvement,
            'labor_savings': self.labor_cost_savings,
            'efficiency_savings': self.efficiency_savings,
            'total_annual_savings': self.total_annual_savings,
            'roi_percentage': self.roi_percentage,
            'payback_months': self.payback_months
        }

    def __str__(self):
        return f"ROI Calculation for {self.contact} - {self.created_at.date()}"
class LeadScore(models.Model):
    SCORE_TYPES = [
        ('DEMOGRAPHIC', 'Demographic'),
        ('BEHAVIORAL', 'Behavioral'),
        ('ENGAGEMENT', 'Engagement')
    ]

    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='scores')
    score_type = models.CharField(max_length=50, choices=SCORE_TYPES)
    score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    reason = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.contact} - {self.score_type} Score: {self.score}"

# leads/models.py - Add this to your existing models

class NewsletterSubscription(models.Model):
    SUBSCRIPTION_SOURCES = [
        ('BANNER', 'Homepage Banner'),
        ('CONTENT_END', 'Content End'),
    ]

    first_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    source = models.CharField(max_length=20, choices=SUBSCRIPTION_SOURCES)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    # Metrics tracking
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    time_to_signup = models.IntegerField(null=True, blank=True)  # Time in seconds from page load to signup

    def __str__(self):
        return f"{self.email} - {self.source}"

    class Meta:
        ordering = ['-subscribed_at']


class IdentityManager(Manager):
    def create_anonymous(self, anonymous_id: str, **kwargs) -> 'Identity':
        """Create a new anonymous identity."""
        return self.create(
            anonymous_id=anonymous_id,
            is_anonymous=True,
            **kwargs
        )

    def get_or_create_from_email(self, email: str, **kwargs) -> tuple['Identity', bool]:
        """Get or create an identity from email address."""
        identity = self.filter(primary_email=email).first()
        if identity:
            return identity, False

        return self.create(
            primary_email=email,
            is_anonymous=False,
            **kwargs
        ), True

class Identity(models.Model):
    """
    Core identity model for tracking users across multiple touchpoints.
    Supports both anonymous and known users with merging capabilities.
    """
    # Primary Fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    primary_email = models.EmailField(null=True, blank=True, unique=True)
    anonymous_id = models.CharField(max_length=100, null=True, blank=True, unique=True)
    current_session_id = models.CharField(max_length=100, null=True, blank=True)

    # Status Fields
    is_active = models.BooleanField(default=True)
    is_anonymous = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    first_seen_at = models.DateTimeField(auto_now_add=True)
    last_seen_at = models.DateTimeField(auto_now=True)
    source_of_first_identification = models.CharField(max_length=50, null=True, blank=True)

    # Tracking Fields
    last_ip_address = models.GenericIPAddressField(null=True, blank=True)
    last_user_agent = models.TextField(blank=True)

    # Consent Fields
    marketing_consent = models.BooleanField(default=True)  # Default opt-in as specified
    analytics_consent = models.BooleanField(default=True)  # Default opt-in as specified
    consent_updated_at = models.DateTimeField(null=True, blank=True)

    # Merge Tracking
    merged_with = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='merged_identities',
        help_text="Points to the primary identity if this was merged"
    )

    objects = IdentityManager()

    class Meta:
        verbose_name_plural = "Identities"
        indexes = [
            models.Index(fields=['anonymous_id']),
            models.Index(fields=['primary_email']),
            models.Index(fields=['current_session_id']),
        ]

    def __str__(self):
        if self.primary_email:
            return f"Identity: {self.primary_email}"
        return f"Anonymous: {self.anonymous_id[:8]}"

    def clean(self):
        """Validate the identity model."""
        if not self.anonymous_id and not self.primary_email:
            raise ValidationError(
                "Either anonymous_id or primary_email must be provided"
            )

        if self.merged_with and self.merged_with == self:
            raise ValidationError("An identity cannot be merged with itself")

    def save(self, *args, **kwargs):
        """Override save to run validations and update timestamps."""
        self.clean()
        if not self.consent_updated_at and (self.marketing_consent or self.analytics_consent):
            self.consent_updated_at = timezone.now()
        super().save(*args, **kwargs)

    # Identity Management Methods
    def mark_as_verified(self) -> None:
        """Mark the identity as verified."""
        self.is_verified = True
        self.save(update_fields=['is_verified'])

    def update_session(self, session_id: str, ip_address: Optional[str] = None,
                      user_agent: Optional[str] = None) -> None:
        """Update session and tracking information."""
        self.current_session_id = session_id
        if ip_address:
            self.last_ip_address = ip_address
        if user_agent:
            self.last_user_agent = user_agent
        self.last_seen_at = timezone.now()
        self.save(update_fields=[
            'current_session_id', 'last_ip_address',
            'last_user_agent', 'last_seen_at'
        ])

    def convert_to_known(self, email: str, source: str) -> None:
        """Convert an anonymous identity to a known identity."""
        if not self.is_anonymous:
            return

        self.primary_email = email
        self.is_anonymous = False
        self.source_of_first_identification = source
        self.save(update_fields=[
            'primary_email', 'is_anonymous',
            'source_of_first_identification'
        ])

    # Consent Management Methods
    def update_consent(self, marketing: bool = None, analytics: bool = None) -> None:
        """Update consent settings."""
        updated = False
        if marketing is not None and marketing != self.marketing_consent:
            self.marketing_consent = marketing
            updated = True
        if analytics is not None and analytics != self.analytics_consent:
            self.analytics_consent = analytics
            updated = True

        if updated:
            self.consent_updated_at = timezone.now()
            self.save(update_fields=[
                'marketing_consent', 'analytics_consent',
                'consent_updated_at'
            ])

# leads/models.py - Add this with your other models
class IdentityEmail(models.Model):
    """
    Tracks multiple email addresses associated with an Identity.
    Supports primary/secondary emails and verification status.
    """
    identity = models.ForeignKey(
        Identity,
        on_delete=models.CASCADE,
        related_name='emails'
    )
    email = models.EmailField(unique=True)
    is_primary = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    verification_sent_at = models.DateTimeField(null=True, blank=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    first_seen_at = models.DateTimeField(auto_now_add=True)
    last_used_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Identity Email"
        verbose_name_plural = "Identity Emails"
        ordering = ['-is_primary', '-last_used_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['identity', 'is_primary']),
        ]

    def __str__(self):
        return f"{self.email} ({'Primary' if self.is_primary else 'Secondary'})"

    def save(self, *args, **kwargs):
        # If this is marked as primary, ensure no other emails for this identity are primary
        if self.is_primary:
            IdentityEmail.objects.filter(
                identity=self.identity,
                is_primary=True
            ).exclude(id=self.id).update(is_primary=False)
        super().save(*args, **kwargs)

    def mark_as_verified(self):
        """Mark the email as verified and record verification time."""
        self.is_verified = True
        self.verified_at = timezone.now()
        self.save(update_fields=['is_verified', 'verified_at'])

    def send_verification(self):
        """Send verification email and record when it was sent."""
        # TODO: Implement actual email sending logic
        self.verification_sent_at = timezone.now()
        self.save(update_fields=['verification_sent_at'])

class IdentityDevice(models.Model):
    identity = models.ForeignKey(
        'Identity',
        on_delete=models.CASCADE,
        related_name='devices'
    )
    fingerprint = models.CharField(
        max_length=255,
        db_index=True,
        help_text="Unique device fingerprint hash"
    )
    first_seen_at = models.DateTimeField(
        default=timezone.now,
        help_text="When this device was first associated with the identity"
    )
    last_seen_at = models.DateTimeField(
        auto_now=True,
        help_text="Last time this device was active"
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        help_text="Last known user agent string"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this device is still actively used"
    )

    class Meta:
        unique_together = ['identity', 'fingerprint']
        indexes = [
            models.Index(fields=['fingerprint']),
            models.Index(fields=['last_seen_at']),
        ]
        ordering = ['-last_seen_at']

    def __str__(self):
        return f"Device {self.fingerprint[:8]}... ({self.identity})"

    def mark_seen(self):
        """Update the last_seen_at timestamp"""
        self.last_seen_at = timezone.now()
        self.save(update_fields=['last_seen_at'])
