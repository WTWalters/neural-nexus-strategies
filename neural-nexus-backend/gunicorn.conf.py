# gunicorn.conf.py
import multiprocessing

bind = "0.0.0.0:8080"
workers = multiprocessing.cpu_count() * 2 + 1
threads = 2
worker_class = "gthread"
timeout = 120
keepalive = 5
max_requests = 1000
max_requests_jitter = 50
preload_app = True

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

def on_starting(server):
    """Run before the server starts."""
    # Configure Django
    import os

    import django
    from django.core.management import call_command
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings_prod')
    django.setup()

    # Run migrations
    call_command('migrate', no_input=True)

    # Collect static files
    call_command('collectstatic', no_input=True)
