# content/tests/conftest.py
import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .factories import UserFactory, ContentFactory

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def authenticated_client(api_client):
    user = UserFactory()
    api_client.force_authenticate(user=user)
    return api_client, user

@pytest.fixture
def user():
    return UserFactory()

@pytest.fixture
def content():
    return ContentFactory()
