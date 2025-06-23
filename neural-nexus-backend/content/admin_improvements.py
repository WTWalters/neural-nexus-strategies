# content/admin_improvements.py
"""Enhanced admin interface for landing page management."""

from django import forms
from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from .models import Campaign, LandingPage
import json


class LandingPageContentWidget(forms.Textarea):
    """Enhanced JSON editor widget for landing page content."""
    
    def __init__(self, attrs=None):
        default_attrs = {
            'rows': 30,
            'cols': 100,
            'class': 'json-editor'
        }
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)

    class Media:
        css = {
            'all': ('admin/css/landing-page-editor.css',)
        }
        js = ('admin/js/landing-page-editor.js',)


class LandingPageAdminForm(forms.ModelForm):
    """Enhanced form for landing page admin with JSON validation."""
    
    content = forms.CharField(
        widget=LandingPageContentWidget,
        help_text="JSON structure for landing page sections"
    )
    
    class Meta:
        model = LandingPage
        fields = '__all__'
    
    def clean_content(self):
        content = self.cleaned_data['content']
        try:
            if isinstance(content, str):
                parsed = json.loads(content)
            else:
                parsed = content
            
            # Validate required structure
            if 'sections' not in parsed:
                raise forms.ValidationError("Content must include 'sections' array")
            
            if 'meta' not in parsed:
                raise forms.ValidationError("Content must include 'meta' object")
                
            return parsed
        except json.JSONDecodeError as e:
            raise forms.ValidationError(f"Invalid JSON: {e}")


class EnhancedLandingPageAdmin(admin.ModelAdmin):
    """Enhanced admin interface for landing pages with templates and preview."""
    
    form = LandingPageAdminForm
    list_display = ['title', 'campaign', 'is_active', 'created_by', 'view_count']
    list_filter = ['is_active', 'campaign', 'created_at']
    search_fields = ['title', 'meta_title']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at', 'preview_link']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'campaign', 'is_active')
        }),
        ('SEO Metadata', {
            'fields': ('meta_title', 'meta_description')
        }),
        ('Content Structure', {
            'fields': ('content', 'content_templates'),
            'description': 'Use the templates below or edit JSON directly'
        }),
        ('Preview & Actions', {
            'fields': ('preview_link',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('templates/', self.admin_site.admin_view(self.template_library_view), 
                 name='landingpage_templates'),
            path('<int:object_id>/preview/', self.admin_site.admin_view(self.preview_view), 
                 name='landingpage_preview'),
        ]
        return custom_urls + urls
    
    def content_templates(self, obj):
        """Display template selection buttons."""
        return """
        <div class="template-selector">
            <h4>Quick Templates:</h4>
            <button type="button" onclick="loadTemplate('lead-magnet')" class="button">Lead Magnet</button>
            <button type="button" onclick="loadTemplate('webinar')" class="button">Webinar Registration</button>
            <button type="button" onclick="loadTemplate('product-demo')" class="button">Product Demo</button>
            <button type="button" onclick="loadTemplate('case-study')" class="button">Case Study</button>
        </div>
        """
    content_templates.short_description = 'Content Templates'
    
    def preview_link(self, obj):
        """Generate preview link for the landing page."""
        if obj.pk:
            return f'<a href="/admin/content/landingpage/{obj.pk}/preview/" target="_blank">Preview Page</a>'
        return 'Save to enable preview'
    preview_link.short_description = 'Preview'
    preview_link.allow_tags = True
    
    def view_count(self, obj):
        """Display view count if available."""
        # This would need to be implemented with analytics
        return 'N/A'
    view_count.short_description = 'Views'
    
    def template_library_view(self, request):
        """View for managing landing page templates."""
        templates = {
            'lead-magnet': {
                'name': 'Lead Magnet',
                'description': 'Download gated content with form capture',
                'sections': ['hero', 'value-props', 'cta-download']
            },
            'webinar': {
                'name': 'Webinar Registration',
                'description': 'Event registration with date/time info',
                'sections': ['hero', 'agenda', 'speakers', 'registration']
            },
            'product-demo': {
                'name': 'Product Demo',
                'description': 'Schedule demo with contact form',
                'sections': ['hero', 'features', 'benefits', 'demo-request']
            }
        }
        
        if request.method == 'POST':
            template_type = request.POST.get('template_type')
            if template_type in templates:
                content = self.generate_template_content(template_type)
                return JsonResponse({'content': content})
        
        return render(request, 'admin/content/landingpage_templates.html', {
            'templates': templates
        })
    
    def preview_view(self, request, object_id):
        """Preview view for landing pages."""
        try:
            landing_page = LandingPage.objects.get(pk=object_id)
            return render(request, 'admin/content/landingpage_preview.html', {
                'landing_page': landing_page,
                'content': landing_page.content
            })
        except LandingPage.DoesNotExist:
            messages.error(request, 'Landing page not found')
            return redirect('admin:content_landingpage_changelist')
    
    def generate_template_content(self, template_type):
        """Generate template content based on type."""
        templates = {
            'lead-magnet': {
                "meta": {
                    "title": "Download Our Free Guide",
                    "description": "Get expert insights and actionable strategies"
                },
                "sections": [
                    {
                        "type": "hero",
                        "content": {
                            "headline": "Get Your Free Guide",
                            "subheadline": "Expert insights delivered to your inbox",
                            "cta": {"text": "Download Now", "action": "scroll-to-form"},
                            "image": "/media/guide-preview.jpg"
                        }
                    },
                    {
                        "type": "value-props",
                        "content": {
                            "items": [
                                {"icon": "download", "title": "Instant Download", "description": "Get immediate access"},
                                {"icon": "expert", "title": "Expert Content", "description": "Written by industry professionals"},
                                {"icon": "actionable", "title": "Actionable Tips", "description": "Practical strategies you can implement"}
                            ]
                        }
                    },
                    {
                        "type": "cta-download",
                        "content": {
                            "headline": "Download Your Free Guide",
                            "description": "Enter your details below for instant access",
                            "form": {
                                "title": "Get Your Free Guide",
                                "fields": [
                                    {"name": "firstName", "type": "text", "label": "First Name", "required": True},
                                    {"name": "email", "type": "email", "label": "Email Address", "required": True},
                                    {"name": "company", "type": "text", "label": "Company", "required": False}
                                ],
                                "submitText": "Download Now"
                            }
                        }
                    }
                ]
            }
        }
        return templates.get(template_type, {})


# Usage in admin.py:
# admin.site.unregister(LandingPage)
# admin.site.register(LandingPage, EnhancedLandingPageAdmin)