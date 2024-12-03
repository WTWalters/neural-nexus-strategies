# core/settings.py

import os
from pathlib import Path
from dotenv import load_dotenv
from decouple import config

# Load environment variables
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 3rd Party Apps
    'rest_framework',
    'django_filters',
    'corsheaders',
    'drf_spectacular',

    # Local apps
    'services.apps.ServicesConfig',
    'content',
    'leads',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add at the top
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'neural_nexus_backend_db'),
        'USER': os.getenv('DB_USER', 'neural_nexus_user'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'your_password'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Spectacular settings for API documentation
SPECTACULAR_SETTINGS = {
    'TITLE': 'Neural Nexus API',
    'DESCRIPTION': 'API endpoints for Neural Nexus content, services, and lead management',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,

    # Swagger UI configuration
    'SWAGGER_UI_SETTINGS': {
        'persistAuthorization': True,
    },

    # Component settings
    'COMPONENT_SPLIT_REQUEST': True,
    'COMPONENT_NO_READ_ONLY_REQUIRED': True,

    # API organization
    'TAGS': [
        {'name': 'content', 'description': 'Blog posts, resources, and newsletter management'},
        {'name': 'services', 'description': 'Service offerings and categories'},
        {'name': 'leads', 'description': 'ROI calculator and lead management'},
    ],

    # Schema customization
    'ENUM_NAME_OVERRIDES': {
        'ServicePackageTypeEnum': 'services.Service.PACKAGE_TYPES',
        'BlogPostStatusEnum': 'content.BlogPost.STATUS_CHOICES',
        'ResourceTypeEnum': 'content.Resource.RESOURCE_TYPES',
    },

    # Authentication and schema settings
    'SERVE_AUTHENTICATION': None,
    'SCHEMA_PATH_PREFIX': '/api/',
    'SCHEMA_COERCE_PATH_PK_SUFFIX': True,

    # Contact information
    'CONTACT': {
        'name': 'API Support',
        'email': 'api@neuralnexus.com',
    },

    # License information
    'LICENSE': {
        'name': 'Proprietary',
    },
}
# Add these CORS settings at the bottom of the file
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True


#Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')
