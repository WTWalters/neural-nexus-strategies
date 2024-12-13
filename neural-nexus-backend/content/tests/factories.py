# content/tests/factories.py
import factory
from django.contrib.auth import get_user_model
from content.models import Content, Category, Tag

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Sequence(lambda n: f'user{n}@example.com')
    username = factory.Sequence(lambda n: f'user{n}')
    password = factory.PostGenerationMethodCall('set_password', 'password123')
    is_active = True

class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = factory.Sequence(lambda n: f'Category {n}')
    slug = factory.Sequence(lambda n: f'category-{n}')

class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tag

    name = factory.Sequence(lambda n: f'Tag {n}')
    slug = factory.Sequence(lambda n: f'tag-{n}')

class ContentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Content

    title = factory.Sequence(lambda n: f'Content Title {n}')
    slug = factory.Sequence(lambda n: f'content-title-{n}')
    author = factory.SubFactory(UserFactory)
    category = factory.SubFactory(CategoryFactory)
    content = factory.Faker('text', max_nb_chars=1000)
    status = 'published'
