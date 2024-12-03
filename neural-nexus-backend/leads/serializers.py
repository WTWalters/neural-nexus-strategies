from rest_framework import serializers
from .models import Contact, Interaction, ROICalculation, LeadScore, NewsletterSubscription

class InteractionSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)

    class Meta:
        model = Interaction
        fields = [
            'id', 'type', 'description', 'created_by',
            'created_by_name', 'created_at'
        ]

class ROICalculationSerializer(serializers.ModelSerializer):
    contact_name = serializers.SerializerMethodField()

    class Meta:
        model = ROICalculation
        fields = [
            'id', 'contact', 'contact_name', 'annual_revenue',
            'data_team_size', 'avg_salary', 'manual_hours_weekly',
            'report_turnaround_days', 'completion_rate',
            'data_request_backlog', 'current_tools_cost',
            'projected_time_savings', 'projected_completion_rate',
            'labor_cost_savings', 'efficiency_savings',
            'total_annual_savings', 'roi_percentage', 'payback_months',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'projected_time_savings', 'projected_completion_rate',
            'labor_cost_savings', 'efficiency_savings',
            'total_annual_savings', 'roi_percentage', 'payback_months'
        ]

    def get_contact_name(self, obj):
        return f"{obj.contact.first_name} {obj.contact.last_name}" if obj.contact else ""

class ROICalculatorInputSerializer(serializers.Serializer):
    """Serializer for ROI calculator input data"""
    contact_id = serializers.IntegerField(required=True)
    annual_revenue = serializers.DecimalField(max_digits=15, decimal_places=2)
    data_team_size = serializers.IntegerField(min_value=1)
    avg_salary = serializers.DecimalField(max_digits=10, decimal_places=2)
    manual_hours_weekly = serializers.IntegerField(min_value=0)
    report_turnaround_days = serializers.IntegerField(min_value=1)
    completion_rate = serializers.IntegerField(min_value=0, max_value=100)
    data_request_backlog = serializers.IntegerField(min_value=0)
    current_tools_cost = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate_contact_id(self, value):
        try:
            Contact.objects.get(id=value)
            return value
        except Contact.DoesNotExist:
            raise serializers.ValidationError("Contact does not exist")

class ROICalculationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new ROI calculations"""
    class Meta:
        model = ROICalculation
        fields = [
            'contact', 'annual_revenue', 'data_team_size',
            'avg_salary', 'manual_hours_weekly',
            'report_turnaround_days', 'completion_rate',
            'data_request_backlog', 'current_tools_cost'
        ]

    def create(self, validated_data):
        # Create the ROI calculation
        calculation = ROICalculation.objects.create(**validated_data)
        # Calculate ROI metrics
        calculation.calculate_roi()
        return calculation

class LeadScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadScore
        fields = ['id', 'score_type', 'score', 'reason', 'created_at']

class ContactSerializer(serializers.ModelSerializer):
    interactions = InteractionSerializer(many=True, read_only=True)
    roi_calculations = ROICalculationSerializer(many=True, read_only=True)
    scores = LeadScoreSerializer(many=True, read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True)

    class Meta:
        model = Contact
        fields = [
            'id', 'first_name', 'last_name', 'email',
            'company', 'job_title', 'phone', 'source',
            'status', 'score', 'assigned_to', 'assigned_to_name',
            'company_size', 'industry', 'annual_revenue',
            'is_active', 'created_at', 'updated_at',
            'last_contacted', 'interactions',
            'roi_calculations', 'scores'
        ]
        read_only_fields = ['score', 'created_at', 'updated_at']

class ContactCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for contact creation"""
    class Meta:
        model = Contact
        fields = [
            'first_name', 'last_name', 'email',
            'company', 'job_title', 'phone',
            'company_size', 'industry'
        ]

class ROICalculationSummarySerializer(serializers.ModelSerializer):
    """Simplified serializer for ROI calculation summaries"""
    contact_name = serializers.SerializerMethodField()

    class Meta:
        model = ROICalculation
        fields = [
            'id', 'contact_name', 'total_annual_savings',
            'roi_percentage', 'payback_months', 'created_at'
        ]

    def get_contact_name(self, obj):
        return f"{obj.contact.first_name} {obj.contact.last_name}" if obj.contact else ""

class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['first_name', 'email', 'source']
