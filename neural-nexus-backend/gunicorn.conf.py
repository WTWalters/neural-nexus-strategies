# gunicorn.conf.py
bind = "0.0.0.0:8080"
workers = 2
worker_class = "gthread"  # Explicitly set to gthread
threads = 4
timeout = 120
loglevel = "debug"
keepalive = 5


def post_fork(server, worker):
    """Run after a worker is forked."""
    import django

    django.setup()
