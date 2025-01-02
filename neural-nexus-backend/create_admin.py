# Path: neural-nexus-backend/create_superuser.py

import os

import django

# Ensure we're using production settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings_prod')
django.setup()

from django.contrib.auth import get_user_model
from django.db import DatabaseError

User = get_user_model()

def create_superuser():
    try:
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='wwalters@neuralnexusstrategies.ai',
                password='NNSAdmin123!'  # Change this immediately after creation
            )
            print("✅ Superuser created successfully!")
        else:
            print("ℹ️ Superuser already exists")
    except DatabaseError as e:
        print(f"❌ Database connection error: {e}")
    except Exception as e:
        print(f"❌ Error creating superuser: {e}")

if __name__ == "__main__":
    create_superuser()
