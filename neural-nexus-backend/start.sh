#!/bin/bash
# Path: neural-nexus-backend/start.sh

# Run migrations
/opt/venv/bin/python manage.py migrate

# Collect static files
/opt/venv/bin/python manage.py collectstatic --noinput

# Start gunicorn
/opt/venv/bin/gunicorn core.wsgi:application --bind 0.0.0.0:8080 --log-level debug
