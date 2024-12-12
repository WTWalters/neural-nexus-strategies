// src/app/(marketing)/blog/page.tsx
/**
 * Blog page component for Neural Nexus marketing section.
 *
 * This component serves as the main blog listing page, handling search, filtering,
 * and pagination of blog posts. It includes a sidebar for additional navigation
 * and search functionality.
 *
 * Features:
 * - Server-side rendering with Next.js
 * - Responsive layout with Tailwind CSS
 * - Dynamic filtering by category and tags
 * - Search functionality
 * - Suspense boundaries for loading states
 *
 * @component
 *
 * Example usage:
 * ```tsx
 * // In app routing
 * <BlogPage searchParams={{ page: "1", category: "technology" }} />
 * ```
 */

import { Suspense } from "react";
import { BlogList } from "@/components/marketing/blog/blog-list";
import { BlogSidebar } from "@/components/marketing/blog/blog-sidebar";
import { BlogSearch } from "@/components/marketing/blog/blog-search";
import { BlogLoading } from "@/components/marketing/blog/blog-loading";
import { BlogAnalytics } from "@/components/marketing/blog/blog-analytics";
import { BlogBreadcrumb } from "@/components/marketing/blog/blog-breadcrumb";

/**
 * Interface for blog page URL search parameters.
 *
 * @interface
 * @property {string} [page] - Page number for pagination
 * @property {string} [category] - Category filter
 * @property {string} [tag] - Tag filter
 * @property {string} [search] - Search query
 */
interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  };
}

/**
 * Main blog page component.
 *
 * Renders the blog listing page with filtering, search, and navigation components.
 * Uses Suspense for loading states and implements responsive design.
 *
 * @param {BlogPageProps} props - Component props containing search parameters
 * @returns {Promise<JSX.Element>} Rendered blog page component
 *
 * @example
 * // Direct usage in Next.js page
 * export default function Page({ searchParams }) {
 *   return <BlogPage searchParams={searchParams} />;
 * }
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Add debug logging
  console.log("Blog page searchParams:", searchParams);

  // First await the searchParams object
  const resolvedSearchParams = await Promise.resolve(searchParams);

  /**
   * Normalized parameters for filtering and pagination.
   * Converts string values to appropriate types and provides defaults.
   */
  const params = {
    page: Number(resolvedSearchParams.page) || 1,
    category: resolvedSearchParams.category,
    tag: resolvedSearchParams.tag,
    search: resolvedSearchParams.search,
  };

  console.log("Resolved params:", params); // Debug log

  /**
   * Generates breadcrumb navigation items based on active filters.
   * Formats URLs and labels for category, tag, and search filters.
   */
  const breadcrumbItems = [];
  if (params.category) {
    breadcrumbItems.push({
      label: params.category.replace(/-/g, " "),
      href: `/blog?category=${params.category}`,
    });
  }
  if (params.tag) {
    breadcrumbItems.push({
      label: `#${params.tag.replace(/-/g, " ")}`,
      href: `/blog?tag=${params.tag}`,
    });
  }
  if (params.search) {
    breadcrumbItems.push({
      label: `Search: ${params.search}`,
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <BlogBreadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <BlogSearch />
          </div>

          <Suspense fallback={<BlogLoading />}>
            <BlogList
              page={params.page}
              category={params.category}
              tag={params.tag}
              search={params.search}
            />
          </Suspense>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3">
          <Suspense
            fallback={
              <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />
            }
          >
            <BlogSidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
