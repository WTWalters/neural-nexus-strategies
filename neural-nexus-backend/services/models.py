# services/models.py
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.text import slugify


class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Service Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @classmethod
    def get_ai_readiness_category(cls):
        """Get or create the AI Data Readiness category."""
        return cls.objects.get_or_create(
            slug="ai-data-readiness",
            defaults={
                "name": "AI Data Readiness",
                "description": "Prepare your data for AI success with our Accelerator framework.",
            },
        )[0]


class Service(models.Model):
    PACKAGE_TYPES = [
        ("ESSENTIALS", "Essentials Package"),
        ("PROFESSIONAL", "Professional Package"),
        ("ENTERPRISE", "Enterprise Package"),
    ]
    
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="services")
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    package_type = models.CharField(max_length=20, choices=PACKAGE_TYPES)
    description = models.TextField()
    base_price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    duration = models.CharField(max_length=100, help_text="e.g., '2 weeks', 'Monthly'")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "package_type", "name"]
        unique_together = ["category", "package_type"]

    def __str__(self):
        return f"{self.name} - {self.get_package_type_display()}"
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    @classmethod
    def create_accelerator_services(cls):
        """Create the three tiers of Accelerator services."""
        category = ServiceCategory.get_ai_readiness_category()

        services = [
            {
                "name": "Quick Diagnostic",
                "package_type": "ESSENTIALS",
                "description": "Free online quiz to assess AI readiness.",
                "base_price": 0.00,
                "duration": "5 minutes",
            },
            {
                "name": "Comprehensive Assessment",
                "package_type": "PROFESSIONAL",
                "description": "2-day deep dive into your data readiness.",
                "base_price": 5000.00,
                "duration": "2 days",
            },
            {
                "name": "Strategic Roadmap",
                "package_type": "ENTERPRISE",
                "description": "Custom plan to optimize data for AI.",
                "base_price": 10000.00,
                "duration": "1 month",
            },
        ]

        created_services = []
        for service_data in services:
            try:
                # Try to get existing service first
                service = cls.objects.get(category=category, package_type=service_data["package_type"])
                created = False
                # Consider updating properties here if needed
                # service.name = service_data["name"]
                # service.save()
            except cls.DoesNotExist:
                # If it doesn't exist, create it
                try:
                    service = cls.objects.create(
                        category=category,
                        package_type=service_data["package_type"],
                        name=service_data["name"],
                        slug=slugify(service_data["name"]),
                        description=service_data["description"],
                        base_price=service_data["base_price"],
                        duration=service_data["duration"],
                    )
                    created = True
                except Exception as e:
                    # If slug conflict occurs, add a suffix to make it unique
                    import random
                    unique_suffix = f"-{random.randint(1000, 9999)}"
                    service = cls.objects.create(
                        category=category,
                        package_type=service_data["package_type"],
                        name=service_data["name"],
                        slug=slugify(service_data["name"]) + unique_suffix,
                        description=service_data["description"],
                        base_price=service_data["base_price"],
                        duration=service_data["duration"],
                    )
                    created = True
            
            created_services.append(service)
        return created_services


class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="features")
    name = models.CharField(max_length=200)
    description = models.TextField()
    is_highlighted = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.service.name} - {self.name}"


class ServiceDeliverable(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="deliverables")
    name = models.CharField(max_length=200)
    description = models.TextField()
    timeline = models.CharField(max_length=100, help_text="Expected delivery timeline")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.service.name} - {self.name}"
