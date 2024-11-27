# content/test/test_content.py
from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APITestCase
from ..models import (
    BlogPost, Category, Tag, BlogAnalytics, Resource,
    ResourceDownload, NewsletterSubscriber
)

class ContentTests(APITestCase):
    def setUp(self):
        """Set up test data"""
        # Clear all existing data first
        BlogPost.objects.all().delete()
        Category.objects.all().delete()
        Tag.objects.all().delete()
        Resource.objects.all().delete()
        NewsletterSubscriber.objects.all().delete()

        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

        # Create test category
        self.category = Category.objects.create(
            name='Test Category',
            slug='test-category',
            description='Test category description'
        )

        # Create test tags
        self.tag1 = Tag.objects.create(name='Python', slug='python')
        self.tag2 = Tag.objects.create(name='Django', slug='django')

        # Create test blog post
        self.blog_post = BlogPost.objects.create(
            title='Test Blog Post',
            slug='test-blog-post',
            author=self.user,
            category=self.category,
            content='Test content',
            status='PUBLISHED',
            excerpt='Test excerpt',
            published_at=timezone.now()
        )
        self.blog_post.tags.add(self.tag1, self.tag2)

        # Create test resource
        self.resource = Resource.objects.create(
            title='Test Resource',
            slug='test-resource',
            description='Test description',
            resource_type='GUIDE',
            file_url='https://example.com/test.pdf',
            is_gated=True
        )
        self.resource.tags.add(self.tag1)

        # Verify we only have one blog post
        assert BlogPost.objects.count() == 1, f"Expected 1 blog post, found {BlogPost.objects.count()}"

    def test_blog_post_retrieval(self):
        """Test blog post listing and detail retrieval"""
        # Double check we only have one blog post
        count = BlogPost.objects.count()
        self.assertEqual(count, 1, f"Expected 1 blog post, found {count}")

        response = self.client.get('/api/content/posts/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1, f"Expected 1 blog post in response, got {len(response.data)}")

        # Test detail view
        response = self.client.get(f'/api/content/posts/{self.blog_post.slug}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Test Blog Post')

    def test_resource_download(self):
        """Test resource download and subscriber creation"""
        response = self.client.post(
            f'/api/content/resources/{self.resource.slug}/download/',
            {
                'email': 'subscriber@example.com',
                'first_name': 'Test',
                'company': 'Test Co'
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn('download_url', response.data)

        # Verify subscriber was created
        subscriber = NewsletterSubscriber.objects.get(email='subscriber@example.com')
        self.assertEqual(subscriber.first_name, 'Test')

        # Verify download was tracked
        self.resource.refresh_from_db()
        self.assertEqual(self.resource.download_count, 1)

    def test_blog_analytics(self):
        """Test blog analytics tracking"""
        response = self.client.post(
            '/api/content/analytics/',
            {
                'blog_post': self.blog_post.id,
                'time_on_page': 120,
                'is_bounce': False
            }
        )
        self.assertEqual(response.status_code, 201)

        # Verify analytics were created
        analytics = BlogAnalytics.objects.get(blog_post=self.blog_post)
        self.assertEqual(analytics.return_visits, 1)
        self.assertEqual(analytics.avg_time_on_page, 120)
