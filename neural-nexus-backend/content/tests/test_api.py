# content/tests/test_api.py
import pytest
from rest_framework import status
from django.urls import reverse
from .factories import ContentFactory, UserFactory

@pytest.mark.django_db
class TestContentAPI:
    def test_create_content(self, authenticated_client):
        client, user = authenticated_client
        data = {
            'title': 'New Content',
            'content': 'Content body',
            'category': CategoryFactory().id,
            'status': 'draft'
        }

        url = reverse('content-list')
        response = client.post(url, data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == 'New Content'

    def test_update_content(self, authenticated_client):
        client, user = authenticated_client
        content = ContentFactory(author=user)

        data = {'title': 'Updated Title'}
        url = reverse('content-detail', kwargs={'slug': content.slug})
        response = client.patch(url, data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == 'Updated Title'
