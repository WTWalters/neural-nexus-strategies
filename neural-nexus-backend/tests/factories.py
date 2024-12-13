import factory
from django.contrib.auth import get_user_model
from core.models import Project, Task

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Sequence(lambda n: f'user{n}@example.com')
    password = factory.PostGenerationMethodCall('set_password', 'password123')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

class ProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Project

    title = factory.Faker('catch_phrase')
    description = factory.Faker('paragraph')
    owner = factory.SubFactory(UserFactory)
    status = factory.Iterator(['active', 'completed', 'archived'])