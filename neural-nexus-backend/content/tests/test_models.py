# content/tests/test_models.py
import pytest
from django.core.exceptions import ValidationError
from content.models import Content, Category, Tag
from .factories import ContentFactory, CategoryFactory, TagFactory, UserFactory

@pytest.mark.django_db
class TestContentModel:
    def test_content_creation(self):
        content = ContentFactory()
        assert Content.objects.count() == 1
        assert content.title is not None
        assert content.slug is not None

    def test_content_str(self):
        content = ContentFactory(title="Test Content")
        assert str(content) == "Test Content"

    def test_content_status_validation(self):
        with pytest.raises(ValidationError):
            content = ContentFactory(status='invalid_status')
            content.full_clean()

@pytest.mark.django_db
class TestCategoryModel:
    def test_category_creation(self):
        category = CategoryFactory()
        assert Category.objects.count() == 1
        assert category.name is not None
        assert category.slug is not None
