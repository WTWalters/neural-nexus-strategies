from django.contrib import admin
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


@admin.register(AcceleratorDimension)
class AcceleratorDimensionAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'weight', 'order', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'display_name', 'description')
    ordering = ('order',)


@admin.register(AcceleratorMaturityLevel)
class AcceleratorMaturityLevelAdmin(admin.ModelAdmin):
    list_display = ('name', 'min_score', 'max_score', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')


class AssessmentQuestionInline(admin.TabularInline):
    model = AssessmentQuestion
    extra = 3
    ordering = ('order',)


@admin.register(AssessmentQuestion)
class AssessmentQuestionAdmin(admin.ModelAdmin):
    list_display = ('get_dimension_name', 'text_preview', 'order', 'is_quick_diagnostic')
    list_filter = ('dimension', 'is_quick_diagnostic')
    search_fields = ('text', 'help_text', 'dimension__name')
    ordering = ('dimension', 'order')
    
    def get_dimension_name(self, obj):
        return obj.dimension.display_name
    get_dimension_name.short_description = 'Dimension'
    
    def text_preview(self, obj):
        return obj.text[:50] + ('...' if len(obj.text) > 50 else '')
    text_preview.short_description = 'Question'


class AssessmentAnswerInline(admin.TabularInline):
    model = AssessmentAnswer
    extra = 0
    raw_id_fields = ('question',)


class AssessmentRecommendationInline(admin.TabularInline):
    model = AssessmentRecommendation
    extra = 0
    raw_id_fields = ('dimension',)


@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('organization_name', 'email', 'assessment_type', 'subscription_tier', 'status', 'overall_score', 'created_at')
    list_filter = ('assessment_type', 'subscription_tier', 'status', 'created_at')
    search_fields = ('organization_name', 'email', 'industry')
    readonly_fields = ('overall_score', 'created_at', 'updated_at')
    inlines = [AssessmentAnswerInline, AssessmentRecommendationInline]
    date_hierarchy = 'created_at'


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('get_dimension_name', 'get_maturity_level_name', 'text_preview')
    list_filter = ('dimension', 'maturity_level')
    search_fields = ('text', 'dimension__name', 'maturity_level__name')
    
    def get_dimension_name(self, obj):
        return obj.dimension.display_name
    get_dimension_name.short_description = 'Dimension'
    
    def get_maturity_level_name(self, obj):
        return obj.maturity_level.name
    get_maturity_level_name.short_description = 'Maturity Level'
    
    def text_preview(self, obj):
        return obj.text[:50] + ('...' if len(obj.text) > 50 else '')
    text_preview.short_description = 'Recommendation'


@admin.register(DataUpload)
class DataUploadAdmin(admin.ModelAdmin):
    list_display = ('get_organization_name', 'get_dimension_name', 'uploaded_at')
    list_filter = ('dimension', 'uploaded_at')
    search_fields = ('assessment__organization_name',)
    readonly_fields = ('uploaded_at',)
    
    def get_organization_name(self, obj):
        return obj.assessment.organization_name
    get_organization_name.short_description = 'Organization'
    
    def get_dimension_name(self, obj):
        return obj.dimension.display_name
    get_dimension_name.short_description = 'Dimension'
