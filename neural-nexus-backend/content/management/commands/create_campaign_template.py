# content/management/commands/create_campaign_template.py
"""Django management command to create campaign templates."""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from content.models import Campaign, LandingPage
import json


class Command(BaseCommand):
    help = 'Create a new campaign with landing page from template'

    def add_arguments(self, parser):
        parser.add_argument('--name', type=str, required=True, help='Campaign name')
        parser.add_argument('--template', type=str, required=True, 
                          choices=['lead-magnet', 'webinar', 'product-demo', 'case-study'],
                          help='Template type')
        parser.add_argument('--user-id', type=int, required=True, help='User ID for creator')

    def handle(self, *args, **options):
        name = options['name']
        template = options['template']
        user_id = options['user_id']

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'User with ID {user_id} does not exist'))
            return

        # Create campaign
        campaign = Campaign.objects.create(
            name=name,
            description=f'Auto-generated campaign from {template} template',
            status='DRAFT',
            created_by=user
        )

        # Generate landing page content based on template
        content = self.get_template_content(template, name)
        
        # Create landing page
        landing_page = LandingPage.objects.create(
            title=f'{name} Landing Page',
            campaign=campaign,
            content=content,
            meta_title=content['meta']['title'],
            meta_description=content['meta']['description'],
            is_active=False,  # Start as inactive
            created_by=user
        )

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created campaign "{name}" with landing page "{landing_page.slug}"'
            )
        )
        self.stdout.write(f'Campaign ID: {campaign.id}')
        self.stdout.write(f'Landing Page ID: {landing_page.id}')
        self.stdout.write(f'Landing Page URL: /{landing_page.slug}/')

    def get_template_content(self, template_type, campaign_name):
        """Generate content based on template type."""
        
        templates = {
            'lead-magnet': {
                "meta": {
                    "title": f"{campaign_name} | Free Download",
                    "description": f"Download our exclusive {campaign_name.lower()} guide with expert insights and actionable strategies."
                },
                "sections": [
                    {
                        "type": "hero",
                        "content": {
                            "headline": f"Get Your Free {campaign_name}",
                            "subheadline": "Expert insights and actionable strategies delivered to your inbox",
                            "cta": {"text": "Download Now", "action": "scroll-to-form"},
                            "image": "/media/default-guide-hero.jpg"
                        }
                    },
                    {
                        "type": "value-props",
                        "content": {
                            "headline": "What You'll Get",
                            "items": [
                                {
                                    "icon": "download",
                                    "title": "Instant Download",
                                    "description": "Get immediate access to your free guide"
                                },
                                {
                                    "icon": "expert",
                                    "title": "Expert Content",
                                    "description": "Written by industry professionals with years of experience"
                                },
                                {
                                    "icon": "actionable",
                                    "title": "Actionable Strategies",
                                    "description": "Practical tips you can implement immediately"
                                }
                            ]
                        }
                    },
                    {
                        "type": "cta-download",
                        "content": {
                            "headline": f"Download Your Free {campaign_name}",
                            "description": "Enter your details below for instant access",
                            "form": {
                                "title": "Get Your Free Guide",
                                "fields": [
                                    {"name": "firstName", "type": "text", "label": "First Name", "required": True},
                                    {"name": "lastName", "type": "text", "label": "Last Name", "required": True},
                                    {"name": "email", "type": "email", "label": "Work Email", "required": True},
                                    {"name": "company", "type": "text", "label": "Company", "required": False}
                                ],
                                "submitText": "Download Now"
                            },
                            "image": "/media/default-guide-preview.jpg"
                        }
                    }
                ]
            },
            
            'webinar': {
                "meta": {
                    "title": f"{campaign_name} | Free Webinar",
                    "description": f"Join our exclusive webinar: {campaign_name}. Learn from industry experts."
                },
                "sections": [
                    {
                        "type": "hero",
                        "content": {
                            "headline": f"Join Our Exclusive Webinar",
                            "subheadline": campaign_name,
                            "cta": {"text": "Register Now", "action": "scroll-to-form"},
                            "image": "/media/default-webinar-hero.jpg"
                        }
                    },
                    {
                        "type": "features",
                        "content": {
                            "headline": "What You'll Learn",
                            "items": [
                                {
                                    "icon": "presentation",
                                    "title": "Expert Insights",
                                    "description": "Learn from industry leaders and practitioners"
                                },
                                {
                                    "icon": "interactive",
                                    "title": "Interactive Q&A",
                                    "description": "Get your questions answered by experts"
                                },
                                {
                                    "icon": "resources",
                                    "title": "Bonus Resources",
                                    "description": "Access exclusive materials and templates"
                                }
                            ]
                        }
                    },
                    {
                        "type": "cta-download",
                        "content": {
                            "headline": "Reserve Your Spot",
                            "description": "Limited seats available. Register now to secure your place.",
                            "form": {
                                "title": "Register for Webinar",
                                "fields": [
                                    {"name": "firstName", "type": "text", "label": "First Name", "required": True},
                                    {"name": "lastName", "type": "text", "label": "Last Name", "required": True},
                                    {"name": "email", "type": "email", "label": "Email Address", "required": True},
                                    {"name": "company", "type": "text", "label": "Company", "required": True},
                                    {"name": "jobTitle", "type": "text", "label": "Job Title", "required": False}
                                ],
                                "submitText": "Register Now"
                            }
                        }
                    }
                ]
            },
            
            'product-demo': {
                "meta": {
                    "title": f"{campaign_name} | Schedule Demo",
                    "description": f"See {campaign_name} in action. Schedule your personalized demo today."
                },
                "sections": [
                    {
                        "type": "hero",
                        "content": {
                            "headline": f"See {campaign_name} in Action",
                            "subheadline": "Schedule your personalized demo and discover how we can help your business",
                            "cta": {"text": "Schedule Demo", "action": "scroll-to-form"},
                            "image": "/media/default-demo-hero.jpg"
                        }
                    },
                    {
                        "type": "features",
                        "content": {
                            "headline": "Why Choose Our Solution",
                            "items": [
                                {
                                    "icon": "customized",
                                    "title": "Tailored Demo",
                                    "description": "See features relevant to your specific use case"
                                },
                                {
                                    "icon": "expert",
                                    "title": "Expert Guidance",
                                    "description": "Get insights from our solution experts"
                                },
                                {
                                    "icon": "no-commitment",
                                    "title": "No Commitment",
                                    "description": "Free demo with no obligations"
                                }
                            ]
                        }
                    },
                    {
                        "type": "cta-download",
                        "content": {
                            "headline": "Schedule Your Demo",
                            "description": "Choose a time that works for you and see our solution in action",
                            "form": {
                                "title": "Request Demo",
                                "fields": [
                                    {"name": "firstName", "type": "text", "label": "First Name", "required": True},
                                    {"name": "lastName", "type": "text", "label": "Last Name", "required": True},
                                    {"name": "email", "type": "email", "label": "Work Email", "required": True},
                                    {"name": "company", "type": "text", "label": "Company", "required": True},
                                    {"name": "phone", "type": "tel", "label": "Phone Number", "required": False}
                                ],
                                "submitText": "Schedule Demo"
                            }
                        }
                    }
                ]
            }
        }
        
        return templates.get(template_type, templates['lead-magnet'])