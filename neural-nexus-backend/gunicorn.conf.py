# gunicorn.conf.py
bind = "0.0.0.0:8080"
workers = 2
threads = 4
timeout = 120
loglevel = "debug"


def post_fork(server, worker):
    """Run after a worker is forked."""
    import django

    django.setup()
