// Path: neural_nexus_frontend/src/app/(marketing)/blog/page.tsx
import { Suspense } from "react";
import { BlogList } from "@/components/marketing/blog/blog-list";
import { BlogSidebar } from "@/components/marketing/blog/blog-sidebar";
import { BlogSearch } from "@/components/marketing/blog/blog-search";
import { BlogLoading } from "@/components/marketing/blog/blog-loading";
import { BlogBreadcrumb } from "@/components/marketing/blog/blog-breadcrumb";

export const fetchCache = "force-dynamic";

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const params = {
    page: Number(resolvedSearchParams.page) || 1,
    category: resolvedSearchParams.category,
    tag: resolvedSearchParams.tag,
    search: resolvedSearchParams.search,
  };

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
      <div className="mb-8">
        <BlogBreadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
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
