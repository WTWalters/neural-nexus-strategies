# leads/models.py

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

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
