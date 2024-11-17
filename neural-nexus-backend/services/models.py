from django.db import models
from django.core.validators import MinValueValidator

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Service Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class Service(models.Model):
    PACKAGE_TYPES = [
        ('ESSENTIALS', 'Essentials Package'),
        ('PROFESSIONAL', 'Professional Package'),
        ('ENTERPRISE', 'Enterprise Package'),
    ]

    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    package_type = models.CharField(max_length=20, choices=PACKAGE_TYPES)
    description = models.TextField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    duration = models.CharField(max_length=100, help_text="e.g., '2 weeks', 'Monthly'")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'package_type', 'name']
        unique_together = ['category', 'package_type']

    def __str__(self):
        return f"{self.name} - {self.get_package_type_display()}"

class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='features')
    name = models.CharField(max_length=200)
    description = models.TextField()
    is_highlighted = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.service.name} - {self.name}"

class ServiceDeliverable(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='deliverables')
    name = models.CharField(max_length=200)
    description = models.TextField()
    timeline = models.CharField(max_length=100, help_text="Expected delivery timeline")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.service.name} - {self.name}"
