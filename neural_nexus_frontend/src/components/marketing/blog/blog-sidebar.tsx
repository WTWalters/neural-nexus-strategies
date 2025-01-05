// src/components/marketing/blog/blog-sidebar.tsx

import Link from "next/link";
import { getBlogPosts, getCategories } from "@/lib/api/blog";
import {
  Category,
  BlogPost,
  BlogListResponse,
  CategoryListResponse,
} from "@/types/blog";

export async function BlogSidebar() {
  try {
    console.log("Fetching sidebar data...");

    const [postsResponse, categoriesResponse] = await Promise.all([
      getBlogPosts({ page: 1, per_page: 3 }).catch((error) => {
        console.error("Error fetching recent posts:", error);
        return {
          data: [] as BlogPost[],
          pagination: {
            total: 0,
            current_page: 1,
            total_pages: 0,
            per_page: 3,
          },
        } as BlogListResponse;
      }),
      getCategories().catch((error) => {
        console.error("Error fetching categories:", error);
        return {
          data: [] as Category[],
          pagination: {
            total: 0,
            current_page: 1,
            total_pages: 0,
            per_page: 10,
          },
        } as CategoryListResponse;
      }),
    ]);

    const categories = categoriesResponse.data || [];
    const posts = postsResponse.data || [];

    return (
      <aside className="space-y-8">
        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Categories
          </h2>
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category: Category) => (
                <li key={`category-${category.id}`}>
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className="text-gray-600 hover:text-primary-600"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories available</p>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Posts
          </h2>
          {posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post: BlogPost) => (
                <li key={`post-${post.id}`}>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-gray-900 font-medium hover:text-primary-600">
                      {post.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent posts available</p>
          )}
        </div>
      </aside>
    );
  } catch (error) {
    console.error("BlogSidebar error:", error);
    return (
      <aside className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-500">Unable to load sidebar content</p>
        </div>
      </aside>
    );
  }
}
