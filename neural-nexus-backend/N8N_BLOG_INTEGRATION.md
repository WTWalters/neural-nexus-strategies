# N8N Blog API Integration Guide

This guide shows you how to integrate N8N with the Neural Nexus blog API for automated content creation and cross-posting.

## Quick Start

### 1. Authentication Setup

**In N8N:**
1. Create a new HTTP Request node
2. Set **Authentication** to "Header Auth"
3. Add header:
   - **Name**: `N8N-Token`
   - **Value**: `dev-token-123` (development) or your production token

### 2. Basic Blog Post Creation

**HTTP Request Node Configuration:**
- **Method**: POST
- **URL**: `http://localhost:8000/api/content/n8n/posts/`
- **Headers**: `N8N-Token: dev-token-123`
- **Body Type**: JSON

**Minimum Required Body:**
```json
{
  "title": "Your Blog Post Title",
  "content": "<p>Your blog post content in HTML</p>",
  "status": "DRAFT"
}
```

**Complete Example Body:**
```json
{
  "title": "AI Implementation Success Story",
  "content": "<h2>Introduction</h2><p>This case study demonstrates...</p>",
  "excerpt": "Learn how our client achieved 40% efficiency gains",
  "category": "AI Strategy",
  "tags": ["ai", "case-study", "success"],
  "status": "PUBLISHED",
  "publish_now": true,
  "seo_title": "AI Implementation Success Story | Neural Nexus",
  "seo_description": "Discover how strategic AI implementation delivered measurable results",
  "seo_keywords": "ai implementation, case study, efficiency, automation"
}
```

## API Endpoints Reference

### Core Endpoints

#### Create Blog Post
- **Endpoint**: `POST /api/content/n8n/posts/`
- **Purpose**: Create a new blog post
- **Returns**: Complete blog post object with ID and slug

#### Health Check
- **Endpoint**: `GET /api/content/n8n/posts/health/`
- **Purpose**: Verify API is working
- **Returns**: Status and timestamp

#### Get Categories
- **Endpoint**: `GET /api/content/n8n/posts/categories/`
- **Purpose**: List all available categories
- **Returns**: Array of categories with ID, name, and slug

#### Get Tags
- **Endpoint**: `GET /api/content/n8n/posts/tags/`
- **Purpose**: List all available tags
- **Returns**: Array of tags with ID, name, and slug

#### Publish Post
- **Endpoint**: `POST /api/content/n8n/posts/{slug}/publish/`
- **Purpose**: Publish a draft post
- **Returns**: Updated status and published timestamp

### Advanced Endpoints

#### Bulk Create Posts
- **Endpoint**: `POST /api/content/n8n/posts/bulk_create/`
- **Body**:
```json
{
  "posts": [
    {
      "title": "Post 1",
      "content": "<p>Content 1</p>",
      "category": "Tech"
    },
    {
      "title": "Post 2", 
      "content": "<p>Content 2</p>",
      "category": "Business"
    }
  ]
}
```

## N8N Workflow Examples

### Example 1: Simple Blog Creation

**Nodes:**
1. **Manual Trigger** or **Webhook**
2. **HTTP Request** (configured as above)
3. **Response** or **Notification**

**HTTP Request Settings:**
```
Method: POST
URL: http://localhost:8000/api/content/n8n/posts/
Authentication: Header Auth
  Header Name: N8N-Token
  Header Value: dev-token-123

Body (JSON):
{
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "category": "{{ $json.category || 'General' }}",
  "status": "{{ $json.status || 'DRAFT' }}"
}
```

### Example 2: Cross-Platform Publishing

**Workflow Flow:**
1. **Manual Trigger** (with blog content)
2. **HTTP Request** → Create on Neural Nexus
3. **HTTP Request** → Post to Medium
4. **HTTP Request** → Post to LinkedIn
5. **HTTP Request** → Post to Dev.to

**Node 2: Create on Neural Nexus**
```
Method: POST
URL: http://localhost:8000/api/content/n8n/posts/
Headers: N8N-Token: dev-token-123
Body: {
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "status": "PUBLISHED",
  "publish_now": true
}
```

**Node 3: Post to Medium**
```
Method: POST
URL: https://api.medium.com/v1/users/{{userId}}/posts
Headers: 
  Authorization: Bearer {{mediumToken}}
  Content-Type: application/json
Body: {
  "title": "{{ $('Create on Neural Nexus').item.json.title }}",
  "contentFormat": "html",
  "content": "{{ $('Create on Neural Nexus').item.json.content }}",
  "publishStatus": "public"
}
```

### Example 3: Scheduled Content Creation

**Nodes:**
1. **Cron Trigger** (e.g., "0 9 * * 1" for Mondays at 9 AM)
2. **HTTP Request** → Get content suggestions
3. **HTTP Request** → Create blog post
4. **Email** → Notify team

**Node 2: Get Suggestions**
```
Method: GET
URL: http://localhost:8000/api/content/n8n/posts/content_suggestions/
Headers: N8N-Token: dev-token-123
```

**Node 3: Create from Suggestion**
```
Method: POST
URL: http://localhost:8000/api/content/n8n/posts/
Headers: N8N-Token: dev-token-123
Body: {
  "title": "Weekly Tech Insights: {{ $json.trending_topics[0] }}",
  "content": "<p>This week's focus: {{ $json.trending_topics[0] }}</p>",
  "category": "Tech Insights",
  "status": "DRAFT"
}
```

## Common N8N Patterns

### Pattern 1: Webhook to Blog
**Use Case**: External system triggers blog creation

1. **Webhook Trigger**
2. **HTTP Request** (create blog post)
3. **Respond to Webhook**

### Pattern 2: RSS to Blog
**Use Case**: Convert RSS feeds to blog posts

1. **Cron Trigger**
2. **RSS Feed Read**
3. **Filter** (recent items only)
4. **HTTP Request** (create blog post)

### Pattern 3: Content Pipeline
**Use Case**: Multi-step content creation

1. **Manual Trigger**
2. **HTTP Request** (create draft)
3. **Delay** (for review time)
4. **HTTP Request** (publish)
5. **Multiple HTTP Requests** (cross-post)

## Error Handling

### Common Errors and Solutions

**401 Unauthorized**
- Check N8N-Token header
- Verify token is in Django N8N_TOKENS environment variable

**400 Bad Request - Missing Title**
```json
{"error": "Title is required for slug generation"}
```
- Ensure title field is provided and not empty

**409 Conflict - Duplicate Slug**
- API automatically generates unique slugs, this shouldn't happen
- If it does, the slug generation has a bug

**500 Internal Server Error**
- Check Django logs
- Verify database connection
- Check for required fields

### N8N Error Handling Setup

Add **Error Handling** to HTTP Request nodes:

**Continue on Fail**: Enable
**Error Output**: Include error details

Add **IF Node** after HTTP Request:
```
Condition: {{ $json.error !== undefined }}
True branch: Send error notification
False branch: Continue workflow
```

## Testing Your Setup

### 1. Test API Directly
```bash
curl -X POST "http://localhost:8000/api/content/n8n/posts/health/" \
  -H "N8N-Token: dev-token-123"
```

### 2. Test Blog Creation
```bash
curl -X POST "http://localhost:8000/api/content/n8n/posts/" \
  -H "Content-Type: application/json" \
  -H "N8N-Token: dev-token-123" \
  -d '{
    "title": "Test Post",
    "content": "<p>Test content</p>",
    "status": "DRAFT"
  }'
```

### 3. Test in N8N
1. Create simple workflow with Manual Trigger
2. Add HTTP Request node with above config
3. Execute manually with test data
4. Check response and Django admin

## Best Practices

### 1. Error Handling
- Always add error handling to HTTP Request nodes
- Log errors for debugging
- Send notifications when workflows fail

### 2. Rate Limiting
- Don't create posts too quickly
- Add delays between bulk operations
- Respect API limits

### 3. Content Quality
- Validate content before posting
- Use templates for consistency
- Include proper SEO fields

### 4. Security
- Store tokens securely in N8N credentials
- Use HTTPS in production
- Rotate tokens regularly

## Environment Setup

### Development
```
Django Backend: http://localhost:8000
N8N Token: dev-token-123
```

### Production
```
Django Backend: https://your-domain.com
N8N Token: production-secure-token
```

Update URLs and tokens in N8N workflows when moving to production.

## Support

### Debugging Steps
1. Test API endpoints directly with curl
2. Check Django backend logs
3. Verify N8N execution logs
4. Test individual workflow nodes

### Common Issues
- **Authentication**: Verify token configuration
- **URLs**: Check endpoint URLs match your setup
- **Data Format**: Ensure JSON structure matches API expectations
- **Network**: Verify N8N can reach Django backend

For additional help, check the Django admin interface to see if posts are being created and review the server logs for detailed error messages.