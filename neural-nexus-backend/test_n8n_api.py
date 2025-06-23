#!/usr/bin/env python3
"""Test script for N8N Blog API"""

import requests
import json
from datetime import datetime

# API Configuration
BASE_URL = "http://localhost:8000/api/content/n8n/posts/"
TOKEN = "dev-token-123"

def test_health_check():
    """Test the health endpoint"""
    print("\n1. Testing health check...")
    
    response = requests.get(
        BASE_URL + "health/",
        headers={"N8N-Token": TOKEN}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✓ Health check passed: {data['environment']} environment")
        print(f"  Status: {data['status']}")
        print(f"  API Version: {data['api_version']}")
    else:
        print(f"✗ Health check failed: {response.status_code}")
        print(f"  Response: {response.text}")

def test_get_categories():
    """Test getting categories"""
    print("\n2. Testing categories endpoint...")
    
    response = requests.get(
        BASE_URL + "categories/",
        headers={"N8N-Token": TOKEN}
    )
    
    if response.status_code == 200:
        categories = response.json()
        print(f"✓ Found {len(categories)} categories")
        for cat in categories[:3]:  # Show first 3
            print(f"  - {cat['name']} (slug: {cat['slug']})")
    else:
        print(f"✗ Categories request failed: {response.status_code}")

def test_get_tags():
    """Test getting tags"""
    print("\n3. Testing tags endpoint...")
    
    response = requests.get(
        BASE_URL + "tags/",
        headers={"N8N-Token": TOKEN}
    )
    
    if response.status_code == 200:
        tags = response.json()
        print(f"✓ Found {len(tags)} tags")
        for tag in tags[:3]:  # Show first 3
            print(f"  - {tag['name']} (slug: {tag['slug']})")
    else:
        print(f"✗ Tags request failed: {response.status_code}")

def test_create_post():
    """Test creating a blog post"""
    print("\n4. Testing blog post creation...")
    
    post_data = {
        "title": f"Test N8N Post - {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "content": "<p>This is a test post created via the n8n API integration.</p><p>It includes multiple paragraphs and <strong>formatted text</strong>.</p>",
        "excerpt": "Testing our new n8n automation API",
        "category": "automation",  # This will create the category if it doesn't exist
        "tags": ["n8n", "api", "test", "automation"],
        "status": "DRAFT",
        "seo_title": "Test N8N Integration",
        "seo_description": "Testing the n8n blog automation API",
        "seo_keywords": "n8n, automation, api, test"
    }
    
    response = requests.post(
        BASE_URL,
        headers={
            "N8N-Token": TOKEN,
            "Content-Type": "application/json"
        },
        json=post_data
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"✓ Blog post created successfully!")
        print(f"  Title: {data['title']}")
        print(f"  Slug: {data['slug']}")
        print(f"  Status: {data['status']}")
        print(f"  ID: {data['id']}")
        return data['slug']
    else:
        print(f"✗ Failed to create post: {response.status_code}")
        print(f"  Error: {response.text}")
        return None

def test_publish_post(slug):
    """Test publishing a post"""
    print(f"\n5. Testing publish endpoint for slug: {slug}...")
    
    response = requests.post(
        f"{BASE_URL}{slug}/publish/",
        headers={"N8N-Token": TOKEN}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✓ Post published successfully!")
        print(f"  Status: {data['status']}")
        print(f"  Published at: {data['published_at']}")
    else:
        print(f"✗ Failed to publish post: {response.status_code}")

def test_invalid_token():
    """Test with invalid token"""
    print("\n6. Testing invalid token (should fail)...")
    
    response = requests.get(
        BASE_URL + "health/",
        headers={"N8N-Token": "invalid-token"}
    )
    
    if response.status_code == 403:
        print("✓ Invalid token correctly rejected")
    else:
        print(f"✗ Unexpected response: {response.status_code}")

if __name__ == "__main__":
    print("N8N Blog API Test Suite")
    print("=" * 50)
    
    # Run tests
    test_health_check()
    test_get_categories()
    test_get_tags()
    
    # Create and publish a post
    slug = test_create_post()
    if slug:
        test_publish_post(slug)
    
    test_invalid_token()
    
    print("\n" + "=" * 50)
    print("Testing complete!")
    print("\nTo verify in Django admin:")
    print("http://localhost:8000/admin/content/blogpost/")
