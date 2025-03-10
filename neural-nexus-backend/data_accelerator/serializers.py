from rest_framework import serializers
from .models import (
    AcceleratorDimension,
    AcceleratorMaturityLevel,
    AssessmentQuestion,
    Assessment,
    AssessmentAnswer,
    Recommendation,
    AssessmentRecommendation,
    DataUpload
)


class AcceleratorMaturityLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceleratorMaturityLevel
        fields = ['id', 'name', 'slug', 'description', 'min_score', 'max_score']


class AssessmentQuestionSerializer(serializers.ModelSerializer):
    dimension_name = serializers.ReadOnlyField(source='dimension.display_name')
    dimension_icon = serializers.ReadOnlyField(source='dimension.icon')
    
    class Meta:
        model = AssessmentQuestion
        fields = [
            'id', 'dimension', 'dimension_name', 'dimension_icon', 
            'text', 'help_text', 'order', 'is_quick_diagnostic'
        ]


class AcceleratorDimensionSerializer(serializers.ModelSerializer):
    questions = AssessmentQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = AcceleratorDimension
        fields = [
            'id', 'name', 'display_name', 'slug', 'description', 
            'short_description', 'weight', 'order', 'icon', 'questions'
        ]


class AcceleratorDimensionBasicSerializer(serializers.ModelSerializer):
    """A simpler version of AcceleratorDimensionSerializer without questions."""
    class Meta:
        model = AcceleratorDimension
        fields = [
            'id', 'name', 'display_name', 'slug', 'short_description', 
            'weight', 'order', 'icon'
        ]


class AssessmentAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentAnswer
        fields = ['id', 'question', 'score', 'notes']


class AssessmentRecommendationSerializer(serializers.ModelSerializer):
    dimension_name = serializers.ReadOnlyField(source='dimension.display_name')
    dimension_icon = serializers.ReadOnlyField(source='dimension.icon')
    
    class Meta:
        model = AssessmentRecommendation
        fields = [
            'id', 'dimension', 'dimension_name', 'dimension_icon',
            'text', 'priority', 'estimated_effort', 'estimated_impact'
        ]


class DataUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataUpload
        fields = ['id', 'dimension', 'file', 'analysis_results', 'uploaded_at']
        read_only_fields = ['analysis_results', 'uploaded_at']


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = [
            'id', 'organization_name', 'industry', 'company_size', 'email',
            'assessment_type', 'subscription_tier', 'status', 'overall_score',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'status', 'overall_score', 'created_at', 'updated_at'
        ]


class AssessmentDetailSerializer(serializers.ModelSerializer):
    answers = AssessmentAnswerSerializer(many=True, read_only=True)
    recommendations = AssessmentRecommendationSerializer(many=True, read_only=True)
    data_uploads = DataUploadSerializer(many=True, read_only=True)
    maturity_level_name = serializers.ReadOnlyField(source='maturity_level.name')
    
    class Meta:
        model = Assessment
        fields = [
            'id', 'organization_name', 'industry', 'company_size', 'email',
            'assessment_type', 'subscription_tier', 'status', 'overall_score',
            'maturity_level_name', 'created_at', 'updated_at', 
            'answers', 'recommendations', 'data_uploads'
        ]


class AssessmentResultsSerializer(serializers.ModelSerializer):
    """Serializer for assessment results, including dimension scores."""
    dimension_scores = serializers.SerializerMethodField()
    recommendations = AssessmentRecommendationSerializer(many=True, read_only=True)
    maturity_level_name = serializers.ReadOnlyField(source='maturity_level.name')
    
    class Meta:
        model = Assessment
        fields = [
            'id', 'organization_name', 'assessment_type', 'overall_score',
            'maturity_level_name', 'dimension_scores', 'recommendations',
            'created_at', 'updated_at'
        ]
    
    def get_dimension_scores(self, obj):
        """Calculate and return scores for each dimension."""
        dimensions = AcceleratorDimension.objects.all()
        dimension_scores = []
        
        for dimension in dimensions:
            answers = obj.answers.filter(question__dimension=dimension)
            if answers.exists():
                avg_score = sum(a.score for a in answers) / answers.count()
                
                # Determine maturity level for this dimension
                maturity_level = AcceleratorMaturityLevel.objects.filter(
                    min_score__lte=avg_score,
                    max_score__gte=avg_score
                ).first()
                
                dimension_scores.append({
                    'dimension_id': dimension.id,
                    'dimension_name': dimension.display_name,
                    'dimension_icon': dimension.icon,
                    'description': dimension.short_description,
                    'score': avg_score,
                    'weight': float(dimension.weight),
                    'maturity_level': maturity_level.name if maturity_level else 'Unknown'
                })
        
        # Sort by dimension order
        return sorted(dimension_scores, key=lambda x: dimensions.get(id=x['dimension_id']).order)


class SubmitAnswersSerializer(serializers.Serializer):
    """Serializer for submitting multiple answers at once."""
    answers = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField(),
            allow_empty=False
        ),
        allow_empty=False
    )


class QuickDiagnosticSerializer(serializers.Serializer):
    """Serializer for submitting a quick diagnostic assessment."""
    organization_name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    industry = serializers.CharField(max_length=100, required=False, allow_blank=True)
    company_size = serializers.CharField(max_length=100, required=False, allow_blank=True)
    answers = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField(),
            allow_empty=False
        ),
        allow_empty=False
    )
