# content/tests/test_serializers.py
import pytest
from content.serializers import ContentSerializer
from .factories import ContentFactory

@pytest.mark.django_db
class TestContentSerializer:
    def test_serializer_contains_expected_fields(self):
        content = ContentFactory()
        serializer = ContentSerializer(content)

        assert set(serializer.data.keys()) == {
            'id', 'title', 'slug', 'content', 'author', 'category',
            'tags', 'status', 'created_at', 'updated_at'
        }

    def test_serializer_validates_data(self):
        valid_data = {
            'title': 'Test Content',
            'content': 'Test content body',
            'author': UserFactory().id,
            'category': CategoryFactory().id,
            'status': 'draft'
        }
        serializer = ContentSerializer(data=valid_data)
        assert serializer.is_valid()
