from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class AcceleratorDimension(models.Model):
    """The seven dimensions of the AI Data Accelerator framework."""
    name = models.CharField(max_length=100)
    display_name = models.CharField(max_length=100)  # E.g. "Data Trust Engine"
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=255)  # E.g. "Make your data bulletproof for AI"
    weight = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    order = models.PositiveIntegerField(default=0)
    icon = models.CharField(max_length=50, blank=True)  # For frontend display
    
    class Meta:
        ordering = ["order"]
    
    def __str__(self):
        return self.display_name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    @classmethod
    def create_default_dimensions(cls):
        """Create the seven default dimensions with proper weights."""
        dimensions = [
            {
                "name": "data_trust_engine",
                "display_name": "Data Trust Engine",
                "description": "Ensure your data is accurate, complete, consistent, and reliable for AI applications.",
                "short_description": "Make your data bulletproof for AI.",
                "weight": 20,
                "order": 1,
                "icon": "🛡️"
            },
            {
                "name": "data_rulebook",
                "display_name": "Data Rulebook",
                "description": "Establish robust governance, security, and compliance mechanisms for your data.",
                "short_description": "Keep data safe, compliant, and usable.",
                "weight": 15,
                "order": 2,
                "icon": "📖"
            },
            {
                "name": "ai_power_grid",
                "display_name": "AI Power Grid",
                "description": "Build the technical infrastructure needed to support AI initiatives and scale effectively.",
                "short_description": "The tech backbone for AI wins.",
                "weight": 15,
                "order": 3,
                "icon": "⚡"
            },
            {
                "name": "data_flow_superhighway",
                "display_name": "Data Flow Superhighway",
                "description": "Create seamless integration and accessibility of data across systems and departments.",
                "short_description": "Get data where it needs to go, instantly.",
                "weight": 15,
                "order": 4,
                "icon": "🔄"
            },
            {
                "name": "ai_fuel_factory",
                "display_name": "AI Fuel Factory",
                "description": "Develop specialized data structures and formats optimized for AI model training and inference.",
                "short_description": "Build the perfect fuel for AI models.",
                "weight": 15,
                "order": 5,
                "icon": "⛽"
            },
            {
                "name": "ai_mindset_shift",
                "display_name": "AI Mindset Shift",
                "description": "Foster the organizational culture, skills, and leadership needed for AI adoption.",
                "short_description": "Get your team ready to rock AI.",
                "weight": 10,
                "order": 6,
                "icon": "🧠"
            },
            {
                "name": "ai_deployment_machine",
                "display_name": "AI Deployment Machine",
                "description": "Implement effective processes for deploying, monitoring, and maintaining AI solutions.",
                "short_description": "Launch and maintain AI like a pro.",
                "weight": 10,
                "order": 7,
                "icon": "🚀"
            },
        ]
        
        for dim in dimensions:
            cls.objects.get_or_create(
                slug=slugify(dim["name"]),
                defaults={
                    "name": dim["name"],
                    "display_name": dim["display_name"],
                    "description": dim["description"],
                    "short_description": dim["short_description"],
                    "weight": dim["weight"],
                    "order": dim["order"],
                    "icon": dim["icon"]
                }
            )


class AcceleratorMaturityLevel(models.Model):
    """Maturity levels for the framework (Baseline, Intermediate, Advanced)."""
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    min_score = models.DecimalField(max_digits=3, decimal_places=1)
    max_score = models.DecimalField(max_digits=3, decimal_places=1)
    
    def __str__(self):
        return self.name
    
    @classmethod
    def create_default_levels(cls):
        """Create the three default maturity levels."""
        levels = [
            {
                "name": "Baseline",
                "slug": "baseline",
                "description": "Fundamental capabilities that must be in place for basic AI implementation.",
                "min_score": 1.0,
                "max_score": 2.5,
            },
            {
                "name": "Intermediate",
                "slug": "intermediate",
                "description": "Enhanced capabilities that enable more advanced AI applications.",
                "min_score": 2.5,
                "max_score": 4.0,
            },
            {
                "name": "Advanced",
                "slug": "advanced",
                "description": "Optimized capabilities that maximize AI value and outcomes.",
                "min_score": 4.0,
                "max_score": 5.0,
            },
        ]
        
        for level in levels:
            cls.objects.get_or_create(
                slug=level["slug"],
                defaults={
                    "name": level["name"],
                    "description": level["description"],
                    "min_score": level["min_score"],
                    "max_score": level["max_score"],
                }
            )


class AssessmentQuestion(models.Model):
    """Questions for the AI Data Accelerator assessment."""
    dimension = models.ForeignKey(
        AcceleratorDimension, 
        on_delete=models.CASCADE, 
        related_name="questions"
    )
    text = models.TextField()
    help_text = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_quick_diagnostic = models.BooleanField(default=True)
    
    class Meta:
        ordering = ["dimension", "order"]
    
    def __str__(self):
        return f"{self.dimension.display_name}: {self.text[:50]}..."


class Assessment(models.Model):
    """User assessment instance."""
    STATUS_CHOICES = [
        ("DRAFT", "Draft"),
        ("COMPLETED", "Completed"),
    ]
    
    ASSESSMENT_TYPES = [
        ("QUICK", "Quick Diagnostic"),
        ("COMPREHENSIVE", "Comprehensive Assessment"),
        ("STRATEGIC", "Strategic Roadmap"),
    ]
    
    SUBSCRIPTION_TIERS = [
        ("FREE", "Free"),
        ("BASIC", "Basic"),
        ("PRO", "Pro"),
    ]
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="assessments",
        null=True,  # Allow anonymous assessments
        blank=True
    )
    organization_name = models.CharField(max_length=200)
    industry = models.CharField(max_length=100, blank=True)
    company_size = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)  # For lead generation
    assessment_type = models.CharField(max_length=20, choices=ASSESSMENT_TYPES, default="QUICK")
    subscription_tier = models.CharField(max_length=20, choices=SUBSCRIPTION_TIERS, default="FREE")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="DRAFT")
    overall_score = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        null=True, 
        blank=True
    )
    maturity_level = models.ForeignKey(
        AcceleratorMaturityLevel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assessments"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.organization_name} - {self.get_assessment_type_display()}"
    
    def calculate_scores(self):
        """Calculate overall and dimension scores."""
        if not self.answers.exists():
            return
        
        dimension_scores = {}
        dimensions = AcceleratorDimension.objects.all()
        total_weight = sum(dim.weight for dim in dimensions)
        weighted_sum = 0
        
        for dimension in dimensions:
            dimension_answers = self.answers.filter(question__dimension=dimension)
            if dimension_answers.exists():
                avg_score = sum(a.score for a in dimension_answers) / dimension_answers.count()
                dimension_scores[dimension.id] = avg_score
                weighted_sum += avg_score * float(dimension.weight)
        
        if dimension_scores:
            # Calculate overall score
            self.overall_score = weighted_sum / total_weight
            
            # Determine maturity level
            self.maturity_level = AcceleratorMaturityLevel.objects.filter(
                min_score__lte=self.overall_score,
                max_score__gte=self.overall_score
            ).first()
            
            self.status = "COMPLETED"
            self.save()
            
            # Generate recommendations
            self.generate_recommendations()
    
    def generate_recommendations(self):
        """Generate recommendations based on dimension scores."""
        # Clear existing recommendations
        self.recommendations.all().delete()
        
        # Get default recommendations for each dimension based on maturity level
        if not self.maturity_level:
            return
            
        for dimension in AcceleratorDimension.objects.all():
            dimension_answers = self.answers.filter(question__dimension=dimension)
            if dimension_answers.exists():
                avg_score = sum(a.score for a in dimension_answers) / dimension_answers.count()
                
                # Find dimension maturity level
                dim_maturity = AcceleratorMaturityLevel.objects.filter(
                    min_score__lte=avg_score,
                    max_score__gte=avg_score
                ).first()
                
                if dim_maturity:
                    # Get or create a recommendation for this dimension and maturity level
                    default_recommendations = Recommendation.get_default_recommendations(dimension, dim_maturity)
                    
                    # Determine priority based on gap to next level
                    if dim_maturity.slug == "baseline":
                        priority = 1  # High priority
                    elif dim_maturity.slug == "intermediate":
                        priority = 2  # Medium priority
                    else:
                        priority = 3  # Low priority
                    
                    for recommendation in default_recommendations:
                        AssessmentRecommendation.objects.create(
                            assessment=self,
                            dimension=dimension,
                            text=recommendation["text"],
                            priority=priority,
                            estimated_effort=recommendation["effort"],
                            estimated_impact=recommendation["impact"]
                        )


class AssessmentAnswer(models.Model):
    """User's answer to an assessment question."""
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey(AssessmentQuestion, on_delete=models.CASCADE)
    score = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    notes = models.TextField(blank=True)
    
    class Meta:
        unique_together = ["assessment", "question"]
    
    def __str__(self):
        return f"{self.assessment.organization_name} - {self.question.text[:30]}... - {self.score}"


class Recommendation(models.Model):
    """Default recommendations for dimensions and maturity levels."""
    dimension = models.ForeignKey(
        AcceleratorDimension, 
        on_delete=models.CASCADE,
        related_name="default_recommendations"
    )
    maturity_level = models.ForeignKey(
        AcceleratorMaturityLevel,
        on_delete=models.CASCADE,
        related_name="default_recommendations"
    )
    text = models.TextField()
    estimated_effort = models.CharField(max_length=100)
    estimated_impact = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.dimension.display_name} - {self.maturity_level.name}"
    
    @classmethod
    def get_default_recommendations(cls, dimension, maturity_level):
        """Get default recommendations for a dimension and maturity level."""
        recommendations = cls.objects.filter(
            dimension=dimension,
            maturity_level=maturity_level
        )
        
        if recommendations.exists():
            return [
                {
                    "text": rec.text,
                    "effort": rec.estimated_effort,
                    "impact": rec.estimated_impact
                }
                for rec in recommendations
            ]
        else:
            # Return a generic recommendation if no specific one exists
            if maturity_level.slug == "baseline":
                effort = "3-6 months"
                impact = "High"
                text = f"Implement foundational {dimension.display_name} capabilities to reach intermediate level."
            elif maturity_level.slug == "intermediate":
                effort = "2-4 months"
                impact = "Medium"
                text = f"Enhance {dimension.display_name} capabilities to reach advanced level."
            else:
                effort = "Ongoing"
                impact = "Low"
                text = f"Maintain and optimize {dimension.display_name} capabilities."
                
            return [{
                "text": text,
                "effort": effort,
                "impact": impact
            }]


class AssessmentRecommendation(models.Model):
    """Specific recommendations for an assessment."""
    assessment = models.ForeignKey(
        Assessment, 
        on_delete=models.CASCADE,
        related_name="recommendations"
    )
    dimension = models.ForeignKey(
        AcceleratorDimension, 
        on_delete=models.CASCADE,
        related_name="assessment_recommendations"
    )
    text = models.TextField()
    priority = models.PositiveSmallIntegerField(default=1)
    estimated_effort = models.CharField(max_length=100)
    estimated_impact = models.CharField(max_length=100)
    
    class Meta:
        ordering = ["priority"]
    
    def __str__(self):
        return f"{self.assessment.organization_name} - {self.dimension.display_name} - Priority: {self.priority}"


class DataUpload(models.Model):
    """Data uploads for tracking progress (Pro tier)."""
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name="data_uploads")
    dimension = models.ForeignKey(AcceleratorDimension, on_delete=models.CASCADE)
    file = models.FileField(upload_to='data_uploads/%Y/%m/%d/')
    analysis_results = models.JSONField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.assessment.organization_name} - {self.dimension.display_name} - {self.uploaded_at}"
