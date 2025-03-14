// Path: neural_nexus_frontend/src/app/(marketing)/blog/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BlogBreadcrumb } from "@/components/marketing/blog/blog-breadcrumb";
import { BlogSidebar } from "@/components/marketing/blog/blog-sidebar";
import { NewsletterContentEnd } from "@/components/marketing/newsletter/newsletter-content-end";
import { getBlogPost } from "@/lib/api/blog";
import { formatDate, formatContent } from "@/lib/utils";

export const fetchCache = "force-dynamic";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    console.log("Attempting to fetch blog post with slug:", params.slug);
    const post = await getBlogPost(params.slug);
    console.log("Received post data:", post);

    if (!post) {
      console.log("No post found, redirecting to 404");
      notFound();
    }

    const breadcrumbItems = [
      {
        label: post.category.name,
        href: `/blog?category=${post.category.slug}`,
      },
      {
        label: post.title,
      },
    ];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
          <BlogBreadcrumb items={breadcrumbItems} className="text-sm" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <article className="flex-1">
            {post.featured_image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={
                    typeof post.featured_image === "object"
                      ? post.featured_image.url
                      : post.featured_image
                  }
                  alt={
                    typeof post.featured_image === "object"
                      ? post.featured_image.altText || post.title
                      : post.title
                  }
                  className="object-cover w-full h-full"
                  width={
                    typeof post.featured_image === "object"
                      ? post.featured_image.width
                      : undefined
                  }
                  height={
                    typeof post.featured_image === "object"
                      ? post.featured_image.height
                      : undefined
                  }
                />
              </div>
            )}

            <header className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <time dateTime={post.published_at || post.created_at}>
                  {formatDate(post.published_at || post.created_at)}
                </time>
                <span>•</span>
                <span>{post.category.name}</span>
                {post.estimated_read_time > 0 && (
                  <>
                    <span>•</span>
                    <span>{post.estimated_read_time} min read</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
              )}
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600"
              dangerouslySetInnerHTML={{
                __html: formatContent(post.content),
              }}
            />

            <div className="mt-16">
              <Suspense
                fallback={
                  <div className="animate-pulse h-48 bg-gray-100 rounded-lg" />
                }
              >
                <NewsletterContentEnd />
              </Suspense>
            </div>
          </article>

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
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
