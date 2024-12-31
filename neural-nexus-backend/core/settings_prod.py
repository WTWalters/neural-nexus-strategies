from .settings import *  # Import base settings

# Override development settings with production values

# Debug should be False in production
DEBUG = False

# Allowed hosts should include Railway domain and your custom domain
ALLOWED_HOSTS = [".railway.app", "neuralnexusstrategies.ai"]

# Database configuration for Railway
import dj_database_url

DATABASES = {"default": dj_database_url.config(default=os.getenv("DATABASE_URL"), conn_max_age=600)}

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "https://neuralnexusstrategies.ai",
]
CORS_ALLOW_CREDENTIALS = True

# Security settings for production
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
