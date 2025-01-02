from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Generate a password hash'

    def handle(self, *args, **options):
        password = 'NNSAdmin123!'
        hashed = make_password(password)
        print(f"Password hash for '{password}': {hashed}")
