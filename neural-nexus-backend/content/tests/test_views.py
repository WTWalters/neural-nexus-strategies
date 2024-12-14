# content/tests/test_views.py

import pytest
from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from content.models import (
    Category, BlogPost, Tag, BlogAnalytics, Resource,
    ResourceDownload, NewsletterSubscriber
)
from .factories import (
    UserFactory, CategoryFactory, TagFactory,
    BlogPostFactory, ResourceFactory
)

# Keeping your existing TestCase classes
class BlogTests(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123',
            email='test@example.com'
        )

        # Create a test category
        self.category = Category.objects.create(
            name='Test Category',
            slug='test-category',
            description='Test Description'
        )

        # Create test tags
        self.tag1 = Tag.objects.create(name='Python')
        self.tag2 = Tag.objects.create(name='Django')

        # Create a test blog post
        self.blog_post = BlogPost.objects.create(
            title='Test Blog Post',
            slug='test-blog-post',
            author=self.user,
            category=self.category,
            content='Test content',
            status='PUBLISHED',
            published_at=timezone.now()
        )
        self.blog_post.tags.add(self.tag1, self.tag2)

    def test_list_blogs(self):
        """Test retrieving a list of blog posts"""
        response = self.client.get('/api/content/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Blog Post')

    def test_retrieve_blog(self):
        """Test retrieving a single blog post"""
        response = self.client.get(f'/api/content/posts/{self.blog_post.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Blog Post')
        self.assertEqual(len(response.data['tags']), 2)

class ResourceTests(APITestCase):
    def setUp(self):
        # Create test resource
        self.resource = Resource.objects.create(
            title='Test Resource',
            slug='test-resource',
            description='Test Description',
            resource_type='GUIDE',
            file_url='https://example.com/test.pdf',
            is_gated=True
        )

    def test_list_resources(self):
        """Test retrieving a list of resources"""
        response = self.client.get('/api/content/resources/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Resource')

    def test_download_gated_resource(self):
        """Test downloading a gated resource"""
        response = self.client.post(
            f'/api/content/resources/{self.resource.slug}/download/',
            {
                'email': 'test@example.com',
                'first_name': 'Test',
                'company': 'Test Co'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('download_url' in response.data)

class NewsletterTests(APITestCase):
    def test_newsletter_subscription(self):
        """Test newsletter subscription flow"""
        # Test subscribe
        response = self.client.post(
            '/api/content/newsletter/subscribe/',
            {
                'email': 'test@example.com',
                'first_name': 'Test'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify subscriber exists
        subscriber = NewsletterSubscriber.objects.get(email='test@example.com')
        self.assertTrue(subscriber.is_active)
        self.assertEqual(subscriber.first_name, 'Test')

        # Test unsubscribe
        response = self.client.post(
            '/api/content/newsletter/unsubscribe/',
            {'email': 'test@example.com'}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify subscriber is inactive
        subscriber.refresh_from_db()
        self.assertFalse(subscriber.is_active)

# Adding new pytest-style test classes
@pytest.mark.django_db
class TestBlogViewsWithPytest:
    def test_create_blog_post(self, authenticated_client):
        """Test creating a new blog post"""
        client, user = authenticated_client
        category = CategoryFactory()
        tags = [TagFactory(), TagFactory()]

        data = {
            'title': 'New Blog Post',
            'content': 'New content',
            'category': category.id,
            'tags': [tag.id for tag in tags],
            'status': 'DRAFT'
        }

        url = reverse('blogpost-list')
        response = client.post(url, data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == 'New Blog Post'
        assert len(response.data['tags']) == 2

    def test_update_blog_post(self, authenticated_client):
        """Test updating a blog post"""
        client, user = authenticated_client
        blog_post = BlogPostFactory(author=user)

        data = {'title': 'Updated Title'}
        url = reverse('blogpost-detail', kwargs={'slug': blog_post.slug})
        response = client.patch(url, data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == 'Updated Title'

    def test_filter_blog_posts(self, api_client):
        """Test filtering blog posts"""
        category = CategoryFactory()
        BlogPostFactory.create_batch(3, category=category, status='PUBLISHED')
        BlogPostFactory(status='DRAFT')

        url = reverse('blogpost-list')
        response = api_client.get(f"{url}?status=PUBLISHED")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 3

@pytest.mark.django_db
class TestResourceViewsWithPytest:
    def test_create_resource(self, authenticated_client):
        """Test creating a new resource"""
        client, user = authenticated_client
        data = {
            'title': 'New Resource',
            'description': 'New resource description',
            'resource_type': 'GUIDE',
            'file_url': 'https://example.com/new.pdf',
            'is_gated': True
        }

        url = reverse('resource-list')
        response = client.post(url, data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == 'New Resource'

    def test_resource_analytics(self, authenticated_client):
        """Test resource analytics tracking"""
        client, user = authenticated_client
        resource = ResourceFactory()

        url = reverse('resource-analytics', kwargs={'slug': resource.slug})
        response = client.post(url, {'event_type': 'VIEW'})

        assert response.status_code == status.HTTP_201_CREATED
        assert ResourceDownload.objects.count() == 1
