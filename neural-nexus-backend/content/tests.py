# content/tests.py

from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
from .models import (
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

    def test_blog_analytics(self):
        """Test blog post analytics tracking"""
        response = self.client.post(
            f'/api/content/posts/{self.blog_post.slug}/track_analytics/',
            {
                'time_on_page': 120,
                'is_bounce': False,
                'shared': True
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify analytics were recorded
        analytics = BlogAnalytics.objects.get(blog_post=self.blog_post)
        self.assertEqual(analytics.avg_time_on_page, 120)
        self.assertEqual(analytics.social_shares, 1)
        self.assertEqual(analytics.return_visits, 1)

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

        # Verify subscriber was created
        subscriber = NewsletterSubscriber.objects.get(email='test@example.com')
        self.assertEqual(subscriber.first_name, 'Test')

        # Verify download was recorded
        download = ResourceDownload.objects.get(
            resource=self.resource,
            subscriber=subscriber
        )
        self.assertEqual(download.company, 'Test Co')

class NewsletterTests(APITestCase):
    def test_newsletter_subscription(self):
        """Test newsletter subscription process"""
        # Test subscribe
        response = self.client.post(
            '/api/content/newsletter/subscribe/',
            {
                'email': 'test@example.com',
                'first_name': 'Test'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Test unsubscribe
        response = self.client.post(
            '/api/content/newsletter/unsubscribe/',
            {'email': 'test@example.com'}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify subscriber is inactive
        subscriber = NewsletterSubscriber.objects.get(email='test@example.com')
        self.assertFalse(subscriber.is_active)
