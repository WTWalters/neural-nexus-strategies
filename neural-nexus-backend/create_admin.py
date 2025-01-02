# Path: neural-nexus-backend/create_admin.py

import os

import django

# Set the Django settings module to your production settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings_prod')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_superuser():
    try:
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='wwalters@neuralnexusstrategies.ai',
                password='ChangeThis123!'  # Change this immediately after creation
            )
            print("Superuser created successfully!")
        else:
            print("Superuser already exists")
    except Exception as e:
        print(f"Error creating superuser: {e}")

if __name__ == "__main__":
    create_superuser()
