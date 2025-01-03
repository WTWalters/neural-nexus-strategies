# gunicorn.conf.py
bind = "0.0.0.0:8080"
workers = 2
worker_class = "gthread"
threads = 4
timeout = 120
loglevel = "debug"
capture_output = True  # Add this line
enable_stdio_inheritance = True  # Add this line
errorlog = "-"
accesslog = "-"


def post_fork(server, worker):
    """Run after a worker is forked."""
    import django

    django.setup()
