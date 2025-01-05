// src/lib/api/blog.ts
// Path: src/lib/api/blog.ts

import type {
  BlogPost,
  Category,
  BlogListResponse,
  CategoryListResponse,
  ImageAsset,
} from "@/types/blog";

// API Response types
interface ApiBlogPost {
  id: number;
  title: string;
  slug: string;
  author: number;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  tags: any[];
  content: string;
  excerpt: string;
  featured_image: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  is_featured: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  estimated_read_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
  analytics: any | null;
}

interface ApiListResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Transform functions
function transformBlogPost(post: ApiBlogPost): BlogPost {
  return {
    ...post,
    featured_image: post.featured_image
      ? {
          url: post.featured_image,
          width: 800, // Default values - adjust based on your needs
          height: 600,
          altText: post.title,
        }
      : undefined,
  };
}

// API Functions
export async function getBlogPosts({
  page = 1,
  category,
  search,
  tag,
  per_page = 10,
}: {
  page?: number;
  category?: string;
  search?: string;
  tag?: string;
  per_page?: number;
} = {}): Promise<BlogListResponse> {
  const params = new URLSearchParams();

  if (page > 1) params.append("page", page.toString());
  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (tag) params.append("tag", tag);
  params.append("per_page", per_page.toString());

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/posts/${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const apiResponse = (await response.json()) as ApiListResponse<ApiBlogPost>;

  return {
    data: apiResponse.results.map(transformBlogPost),
    pagination: {
      total: apiResponse.count,
      current_page: page,
      total_pages: Math.ceil(apiResponse.count / per_page),
      per_page,
    },
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/posts/${slug}`;
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const apiPost = (await response.json()) as ApiBlogPost;
    return transformBlogPost(apiPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getCategories(): Promise<CategoryListResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/categories/`;
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const apiResponse = (await response.json()) as ApiListResponse<Category>;

  return {
    data: apiResponse.results,
    pagination: {
      total: apiResponse.count,
      current_page: 1,
      total_pages: Math.ceil(apiResponse.count / 10),
      per_page: 10,
    },
  };
}

export async function trackBlogAnalytics(
  blogId: number,
  timeOnPage?: number,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/content/analytics/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blog_post: blogId,
        time_on_page: timeOnPage || 0,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to track blog analytics");
  }
}
