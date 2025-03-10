from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

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

from .serializers import (
    AcceleratorDimensionSerializer,
    AcceleratorDimensionBasicSerializer,
    AcceleratorMaturityLevelSerializer,
    AssessmentQuestionSerializer,
    AssessmentSerializer,
    AssessmentDetailSerializer,
    AssessmentResultsSerializer,
    AssessmentAnswerSerializer,
    AssessmentRecommendationSerializer,
    DataUploadSerializer,
    SubmitAnswersSerializer,
    QuickDiagnosticSerializer
)


class AcceleratorDimensionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for framework dimensions."""
    queryset = AcceleratorDimension.objects.all()
    serializer_class = AcceleratorDimensionSerializer
    lookup_field = "slug"
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AcceleratorDimensionBasicSerializer
        return AcceleratorDimensionSerializer

    @action(detail=False, methods=["get"])
    def with_questions(self, request):
        """Get all dimensions with their questions."""
        queryset = self.get_queryset()
        serializer = AcceleratorDimensionSerializer(queryset, many=True)
        return Response(serializer.data)


class AcceleratorMaturityLevelViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for maturity levels."""
    queryset = AcceleratorMaturityLevel.objects.all()
    serializer_class = AcceleratorMaturityLevelSerializer
    lookup_field = "slug"


class AssessmentQuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for assessment questions."""
    queryset = AssessmentQuestion.objects.all()
    serializer_class = AssessmentQuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["dimension", "is_quick_diagnostic"]
    
    @action(detail=False, methods=["get"])
    def quick_diagnostic(self, request):
        """Get questions for quick diagnostic (3 per dimension)."""
        questions = self.queryset.filter(is_quick_diagnostic=True)
        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def by_dimension(self, request):
        """Get questions grouped by dimension."""
        dimensions = AcceleratorDimension.objects.all()
        result = {}
        
        for dimension in dimensions:
            questions = self.queryset.filter(dimension=dimension)
            if questions.exists():
                result[dimension.slug] = self.get_serializer(questions, many=True).data
        
        return Response(result)


class AssessmentViewSet(viewsets.ModelViewSet):
    """ViewSet for assessments."""
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Assessment.objects.filter(user=self.request.user)
        return Assessment.objects.none()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AssessmentDetailSerializer
        return AssessmentSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
    
    @action(detail=False, methods=["post"])
    def anonymous_assessment(self, request):
        """Create an assessment without authentication (lead generation)."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=["post"])
    def submit_answers(self, request, pk=None):
        """Submit answers for an assessment."""
        assessment = self.get_object()
        
        # Validate input data
        serializer = SubmitAnswersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        answers_data = serializer.validated_data.get("answers", [])
        created_answers = []
        
        for answer_data in answers_data:
            question_id = answer_data.get("question")
            score = answer_data.get("score")
            notes = answer_data.get("notes", "")
            
            if not question_id or not score:
                continue
                
            answer, created = AssessmentAnswer.objects.update_or_create(
                assessment=assessment,
                question_id=question_id,
                defaults={
                    "score": score,
                    "notes": notes
                }
            )
            created_answers.append(answer)
        
        # Calculate scores and generate recommendations
        assessment.calculate_scores()
        
        return Response({
            "status": "success", 
            "answers_count": len(created_answers),
            "assessment_id": assessment.id
        })
    
    @action(detail=True, methods=["get"])
    def results(self, request, pk=None):
        """Get assessment results with scores and recommendations."""
        assessment = self.get_object()
        serializer = AssessmentResultsSerializer(assessment)
        return Response(serializer.data)
    
    @action(detail=False, methods=["post"])
    def quick_diagnostic(self, request):
        """Submit a quick diagnostic assessment in one step."""
        serializer = QuickDiagnosticSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create assessment
        assessment = Assessment.objects.create(
            organization_name=serializer.validated_data.get("organization_name"),
            email=serializer.validated_data.get("email"),
            industry=serializer.validated_data.get("industry", ""),
            company_size=serializer.validated_data.get("company_size", ""),
            assessment_type="QUICK",
            subscription_tier="FREE",
            user=request.user if request.user.is_authenticated else None
        )
        
        # Create answers
        answers_data = serializer.validated_data.get("answers", [])
        for answer_data in answers_data:
            question_id = answer_data.get("question")
            score = answer_data.get("score")
            
            if not question_id or not score:
                continue
                
            AssessmentAnswer.objects.create(
                assessment=assessment,
                question_id=question_id,
                score=score
            )
        
        # Calculate scores and generate recommendations
        assessment.calculate_scores()
        
        # Return results
        results_serializer = AssessmentResultsSerializer(assessment)
        return Response(results_serializer.data, status=status.HTTP_201_CREATED)


class DataUploadViewSet(viewsets.ModelViewSet):
    """ViewSet for data uploads."""
    serializer_class = DataUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return DataUpload.objects.filter(
            assessment__user=self.request.user
        )
    
    def perform_create(self, serializer):
        assessment_id = self.request.data.get('assessment')
        if assessment_id:
            try:
                assessment = Assessment.objects.get(id=assessment_id, user=self.request.user)
                if assessment.subscription_tier in ['BASIC', 'PRO']:
                    serializer.save()
                else:
                    return Response(
                        {"error": "Data uploads require Basic or Pro subscription"},
                        status=status.HTTP_403_FORBIDDEN
                    )
            except Assessment.DoesNotExist:
                return Response(
                    {"error": "Assessment not found or access denied"},
                    status=status.HTTP_404_NOT_FOUND
                )
