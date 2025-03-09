# services/management/commands/create_test_services.py
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.db import IntegrityError

from services.models import Service, ServiceCategory, ServiceFeature, ServiceDeliverable


class Command(BaseCommand):
    help = "Creates test services and categories"

    def handle(self, *args, **options):
        # Create AI Readiness category
        ai_category = ServiceCategory.get_ai_readiness_category()
        self.stdout.write(self.style.SUCCESS(f"Created or found category: {ai_category.name}"))

        # Get existing services instead of trying to create them
        # This avoids the uniqueness constraint error
        services = []
        package_types = ["ESSENTIALS", "PROFESSIONAL", "ENTERPRISE"]
        
        for pkg_type in package_types:
            try:
                service = Service.objects.get(category=ai_category, package_type=pkg_type)
                services.append(service)
                self.stdout.write(f"Found existing service: {service.name}")
            except Service.DoesNotExist:
                self.stdout.write(f"No service found for package type {pkg_type}")
                
        if not services:
            self.stdout.write("No services found. Attempting to create them...")
            try:
                services = Service.create_accelerator_services()
                self.stdout.write(
                    self.style.SUCCESS(f"Created {len(services)} accelerator services")
                )
            except IntegrityError as e:
                self.stdout.write(self.style.ERROR(f"Error creating services: {e}"))
                self.stdout.write("Running migrations or clearing the database might be needed.")
                return

        # Add features and deliverables to each service
        for service in services:
            # Add features
            features_count = ServiceFeature.objects.filter(service=service).count()
            if features_count == 0:
                self.stdout.write(f"Adding features to {service.name}")
                for i in range(1, 4):
                    ServiceFeature.objects.create(
                        service=service,
                        name=f"Feature {i} for {service.name}",
                        description=f"Description for feature {i}",
                        is_highlighted=i == 1,
                        order=i,
                    )
            else:
                self.stdout.write(f"Service {service.name} already has {features_count} features")

            # Add deliverables
            deliverables_count = ServiceDeliverable.objects.filter(service=service).count()
            if deliverables_count == 0:
                self.stdout.write(f"Adding deliverables to {service.name}")
                for i in range(1, 3):
                    ServiceDeliverable.objects.create(
                        service=service,
                        name=f"Deliverable {i} for {service.name}",
                        description=f"Description for deliverable {i}",
                        timeline="2 weeks",
                        order=i,
                    )
            else:
                self.stdout.write(
                    f"Service {service.name} already has {deliverables_count} deliverables"
                )

        self.stdout.write(self.style.SUCCESS("Successfully created test services"))
