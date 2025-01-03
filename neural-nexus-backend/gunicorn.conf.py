# gunicorn.conf.py
bind = "0.0.0.0:8080"
workers = 2
worker_class = "sync"  # Changed from gthread to sync
timeout = 30  # Reduced timeout
keepalive = 2
capture_output = True
enable_stdio_inheritance = True
loglevel = "debug"
errorlog = "-"
accesslog = "-"


def post_fork(server, worker):
    """Run after a worker is forked."""
    import django

    django.setup()
