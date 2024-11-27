# utils/blog_test.py

from neural_nexus_helper import NeuralNexusHelper
import os
from dotenv import load_dotenv

def test_blog_implementation():
    # Load environment variables
    load_dotenv()

    # Initialize helper
    helper = NeuralNexusHelper(os.getenv('ANTHROPIC_API_KEY'))

    # Test 1: Blog Post Model and API
    print("\n=== Testing Blog Post Implementation ===")
    blog_code = """
    from django.db import models
    from rest_framework import viewsets
    from .serializers import BlogPostSerializer

    class BlogPost(models.Model):
        title = models.CharField(max_length=200)
        slug = models.SlugField(unique=True)
        content = models.TextField()
        author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
        categories = models.ManyToManyField('Category')
        tags = models.ManyToManyField('Tag')
        published_date = models.DateTimeField(auto_now_add=True)
        updated_date = models.DateTimeField(auto_now=True)
        status = models.CharField(max_length=20, choices=[
            ('draft', 'Draft'),
            ('published', 'Published')
        ])

        class Meta:
            ordering = ['-published_date']

    class BlogPostViewSet(viewsets.ModelViewSet):
        queryset = BlogPost.objects.filter(status='published')
        serializer_class = BlogPostSerializer
        lookup_field = 'slug'

        def perform_create(self, serializer):
            serializer.save(author=self.request.user)
    """

    feedback = helper.check_implementation(blog_code, "BlogPost")
    print(feedback)

    # Test 2: Get guidance on analytics implementation
    print("\n=== Getting Analytics Implementation Guidance ===")
    analytics_question = "How should we implement the blog analytics tracking system based on our requirements?"
    guidance = helper.ask_development_question(analytics_question)
    print(guidance)

    # Test 3: Test Lead Generation Integration
    print("\n=== Testing Lead Generation Integration ===")
    lead_gen_code = """
    class BlogLeadCapture(models.Model):
        blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
        email = models.EmailField()
        resource_downloaded = models.CharField(max_length=100)
        captured_date = models.DateTimeField(auto_now_add=True)

        class Meta:
            unique_together = ['email', 'blog_post']

    class LeadCaptureViewSet(viewsets.ModelViewSet):
        queryset = BlogLeadCapture.objects.all()
        serializer_class = LeadCaptureSerializer

        def create(self, request):
            # Create lead and trigger email workflow
            lead = super().create(request)
            trigger_email_workflow.delay(lead.id)
            return lead
    """

    feedback = helper.check_implementation(lead_gen_code, "BlogLeadCapture")
    print(feedback)

if __name__ == "__main__":
    test_blog_implementation()
