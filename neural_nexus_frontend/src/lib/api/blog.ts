// src/lib/api/blog.ts

export interface BlogPost {
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

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

// src/lib/api/blog.ts
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
} = {}): Promise<BlogPost[]> {
    const params = new URLSearchParams();

    // Add debug log
    console.log("getBlogPosts called with:", {
        page,
        category,
        search,
        tag,
        per_page,
    });

    if (page > 1) params.append("page", page.toString());
    if (category) params.append("category", category);
    if (search) params.append("search", search);
    if (tag) params.append("tag", tag);
    params.append("per_page", per_page.toString());

    // Add debug logging
    console.log("Fetching posts with params:", params.toString());

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/posts/${
        params.toString() ? `?${params.toString()}` : ""
    }`;

    // Log the final URL
    console.log("API URL:", url);
    console.log("Full URL:", url);

    const response = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
    }

    const data = await response.json();
    console.log("Fetched posts:", data); // Debug log
    return data.results || data; // Handle both paginated and non-paginated responses
}

export async function getBlogPost(slug: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/posts/${slug}`;
        const response = await fetch(url, {
            next: { revalidate: 60 }, // Cache for 1 minute
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }
}

export async function getCategories(): Promise<Category[]> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/categories/`;
    console.log("Fetching categories from:", url); // Debug log

    const response = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        console.error("Categories fetch failed:", response.statusText);
        throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    console.log("Categories fetched:", data); // Debug log
    return data;
}

export async function getTags(): Promise<Tag[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/content/tags/`,
        {
            next: { revalidate: 60 },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch tags");
    }

    return response.json();
}

export async function trackBlogAnalytics(blogId: number, timeOnPage?: number) {
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
        console.error("Failed to track blog analytics");
    }
}
