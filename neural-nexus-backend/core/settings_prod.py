# neural-nexus-backend/core/settings_prod.py
# Updates for railway
from .settings import *  # Import base settings

# Override development settings with production values

# Debug should be False in production
DEBUG = False

# Allowed hosts should include Railway domain and your custom domain
ALLOWED_HOSTS = [".railway.app", "neuralnexusstrategies.ai", "*"]

# Database configuration for Railway
import dj_database_url

DATABASES = {"default": dj_database_url.config(default=os.getenv("DATABASE_URL"), conn_max_age=600)}

# Static files configuration for Railway
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Update middleware to include WhiteNoise
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # Add WhiteNoise
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "https://neuralnexusstrategies.ai",
]
CORS_ALLOW_CREDENTIALS = True

# Security settings for production
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = False
CSRF_TRUSTED_ORIGINS = ["https://*.railway.app"]

SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Logging configuration for Railway
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": True,
        },
        "django.security": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": True,
        },
        "django.contrib.auth": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}

# Make sure DJANGO_SETTINGS_MODULE is correctly set
import os

print(f"Settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
print(f"Database URL: {os.environ.get('DATABASE_URL', 'Not set')}")

# Add to settings_prod.py
CSRF_TRUSTED_ORIGINS = ["https://nns-backend-production.up.railway.app", "https://*.railway.app"]

# Explicitly set authentication backends
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

# Ensure session settings are correct
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True

# Add for debugging
CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME = "HTTP_X_CSRFTOKEN"
