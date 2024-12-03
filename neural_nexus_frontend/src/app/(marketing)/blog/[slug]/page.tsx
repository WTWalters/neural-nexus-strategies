// src/app/(marketing)/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { BlogSidebar } from "@/components/marketing/blog/blog-sidebar";
import { BlogBreadcrumb } from "@/components/marketing/blog/blog-breadcrumb";
import { NewsletterContentEnd } from "@/components/marketing/newsletter/newsletter-content-end"; // Add this import
import { getBlogPost } from "@/lib/api/blog";
import { formatDate, formatContent } from "@/lib/utils";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    try {
        const post = await getBlogPost(params.slug); // Remove unnecessary Promise.resolve

        if (!post) {
            notFound();
        }

        // Define breadcrumb items based on the post data
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
                {/* Breadcrumb - now with explicit styling for visibility */}
                <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <BlogBreadcrumb
                        items={breadcrumbItems}
                        className="text-sm"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <article className="flex-1">
                        {post.featured_image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}

                        <header className="mb-8">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                                <time
                                    dateTime={
                                        post.published_at || post.created_at
                                    }
                                >
                                    {formatDate(
                                        post.published_at || post.created_at,
                                    )}
                                </time>
                                <span>•</span>
                                <span>{post.category.name}</span>
                                {post.estimated_read_time > 0 && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            {post.estimated_read_time} min read
                                        </span>
                                    </>
                                )}
                            </div>

                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {post.title}
                            </h1>

                            {post.excerpt && (
                                <p className="text-xl text-gray-600 mb-4">
                                    {post.excerpt}
                                </p>
                            )}
                        </header>

                        <div
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600"
                            dangerouslySetInnerHTML={{
                                __html: formatContent(post.content),
                            }}
                        />

                        {/* Add newsletter component after the content */}
                        <div className="mt-16">
                            <NewsletterContentEnd />
                        </div>
                    </article>

                    <div className="md:w-1/3">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog post:", error);
        notFound();
    }
}
