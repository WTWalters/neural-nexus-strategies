# core/settings.py
# Updated for Railway

"""Django settings for Neural Nexus Backend project.

This module contains all the configuration settings for the Neural Nexus Backend,
including database configuration, installed apps, middleware setup, and various Django
REST Framework configurations.

Attributes:
    BASE_DIR (Path): Base directory path for the project
    SECRET_KEY (str): Django secret key loaded from environment variables
    DEBUG (bool): Debug mode flag
    ALLOWED_HOSTS (list): List of allowed hosts for the application
    INSTALLED_APPS (list): List of installed Django applications
    DATABASES (dict): Database configuration settings
    REST_FRAMEWORK (dict): Django REST Framework settings
    SPECTACULAR_SETTINGS (dict): DRF Spectacular API documentation settings

Environment Variables:
    DJANGO_SECRET_KEY: Secret key for Django
    DJANGO_DEBUG: Debug mode flag (default: 'True')
    DJANGO_ALLOWED_HOSTS: Comma-separated list of allowed hosts
    DB_NAME: PostgreSQL database name
    DB_USER: Database user
    DB_PASSWORD: Database password
    DB_HOST: Database host
    DB_PORT: Database port
    EMAIL_*: Email configuration variables
"""

import os
from pathlib import Path

from decouple import config
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Core Django Settings
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DJANGO_DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

# Application Configuration
# Built-in Django apps, third-party apps, and local apps
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd Party Apps
    "rest_framework",
    "django_filters",
    "corsheaders",
    "drf_spectacular",
    "rangefilter",
    # Local apps
    "services.apps.ServicesConfig",
    "content",
    "leads",
]

# Middleware Configuration
# Note: Order is important, especially for security
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS handling must come first
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# URL and Template Configuration
ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# Database Configuration
# Uses PostgreSQL with environment variable configuration
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", "neural_nexus_backend_db"),
        "USER": os.getenv("DB_USER", "neural_nexus_user"),
        "PASSWORD": os.getenv("DB_PASSWORD", "your_password"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}

# Authentication and Password Validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization and Localization Settings
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# REST Framework settings
REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# Spectacular settings for API documentation
SPECTACULAR_SETTINGS = {
    "TITLE": "Neural Nexus API",
    "DESCRIPTION": "API endpoints for Neural Nexus content, services, and lead management",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    # Swagger UI configuration
    "SWAGGER_UI_SETTINGS": {
        "persistAuthorization": True,
    },
    # Component settings
    "COMPONENT_SPLIT_REQUEST": True,
    "COMPONENT_NO_READ_ONLY_REQUIRED": True,
    # API organization
    "TAGS": [
        {"name": "content", "description": "Blog posts, resources, and newsletter management"},
        {"name": "services", "description": "Service offerings and categories"},
        {"name": "leads", "description": "ROI calculator and lead management"},
    ],
    # Schema customization
    "ENUM_NAME_OVERRIDES": {
        "ServicePackageTypeEnum": "services.Service.PACKAGE_TYPES",
        "BlogPostStatusEnum": "content.BlogPost.STATUS_CHOICES",
        "ResourceTypeEnum": "content.Resource.RESOURCE_TYPES",
    },
    # Authentication and schema settings
    "SERVE_AUTHENTICATION": None,
    "SCHEMA_PATH_PREFIX": "/api/",
    "SCHEMA_COERCE_PATH_PK_SUFFIX": True,
    # Contact information
    "CONTACT": {
        "name": "API Support",
        "email": "api@neuralnexus.com",
    },
    # License information
    "LICENSE": {
        "name": "Proprietary",
    },
}

# CORS Configuration
# Controls which domains can access the API
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True


# Email Configuration
# Uses environment variables for secure email settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")
