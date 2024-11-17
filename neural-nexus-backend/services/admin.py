from django.contrib import admin
from .models import ServiceCategory, Service, ServiceFeature, ServiceDeliverable

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}

class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1

class ServiceDeliverableInline(admin.TabularInline):
    model = ServiceDeliverable
    extra = 1

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'package_type', 'base_price', 'is_active')
    list_filter = ('category', 'package_type', 'is_active')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ServiceFeatureInline, ServiceDeliverableInline]
