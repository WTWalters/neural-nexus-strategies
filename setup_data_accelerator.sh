#!/bin/bash

cd neural-nexus-backend

# Activate virtual environment 
source .venv/bin/activate || source venv/bin/activate

# Create migrations
echo "Creating migrations for data_accelerator..."
python manage.py makemigrations data_accelerator

# Apply migrations
echo "Applying migrations..."
python manage.py migrate

# Seed initial data
echo "Seeding initial data..."
python manage.py setup_data_accelerator

echo "Setup complete!"
