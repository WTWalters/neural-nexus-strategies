# content/tests/test_views.py

from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
from content.models import (
    Category, BlogPost, Tag, BlogAnalytics, Resource,
    ResourceDownload, NewsletterSubscriber
)

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
