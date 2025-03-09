from django.db import migrations


def create_accelerator_services(apps, schema_editor):
    ServiceCategory = apps.get_model("services", "ServiceCategory")
    Service = apps.get_model("services", "Service")
    ServiceFeature = apps.get_model("services", "ServiceFeature")
    ServiceDeliverable = apps.get_model("services", "ServiceDeliverable")

    # Create category
    category, _ = ServiceCategory.objects.get_or_create(
        slug="ai-data-readiness",
        defaults={
            "name": "AI Data Readiness",
            "description": "Prepare your data for AI success with our Accelerator framework.",
        },
    )

    # Create services
    quick, _ = Service.objects.get_or_create(
        slug="quick-diagnostic",
        defaults={
            "category": category,
            "name": "Quick Diagnostic",
            "package_type": "ESSENTIALS",
            "description": "Free online quiz to assess AI readiness.",
            "base_price": 0.00,
            "duration": "5 minutes",
        },
    )

    Service.objects.get_or_create(
        slug="comprehensive-assessment",
        defaults={
            "category": category,
            "name": "Comprehensive Assessment",
            "package_type": "PROFESSIONAL",
            "description": "2-day deep dive into your data readiness.",
            "base_price": 5000.00,
            "duration": "2 days",
        },
    )

    Service.objects.get_or_create(
        slug="strategic-roadmap",
        defaults={
            "category": category,
            "name": "Strategic Roadmap",
            "package_type": "ENTERPRISE",
            "description": "Custom plan to optimize data for AI.",
            "base_price": 10000.00,
            "duration": "1 month",
        },
    )

    # Create features and deliverables for Quick Diagnostic
    ServiceFeature.objects.get_or_create(
        service=quick,
        name="Readiness Quiz",
        defaults={
            "description": "21-question assessment covering 7 key dimensions of AI readiness.",
            "is_highlighted": True,
            "order": 1,
        },
    )

    ServiceDeliverable.objects.get_or_create(
        service=quick,
        name="Score Report",
        defaults={
            "description": "Instant readiness score with dimension-by-dimension breakdown.",
            "timeline": "Immediate",
            "order": 1,
        },
    )


def remove_accelerator_services(apps, schema_editor):
    ServiceCategory = apps.get_model("services", "ServiceCategory")
    ServiceCategory.objects.filter(slug="ai-data-readiness").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("services", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_accelerator_services, remove_accelerator_services),
    ]
