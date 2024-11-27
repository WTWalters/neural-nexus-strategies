// src/components/marketing/blog/blog-card.tsx

"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";
import { BlogImage } from "./blog-image";
import { trackBlogEvent } from "@/lib/analytics";
import { useState } from "react";

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    const [hasImageError, setHasImageError] = useState(false);

    const handleImageError = () => {
        setHasImageError(true);
        trackBlogEvent({
            action: "error",
            category: "post",
            label: "image_load_failed",
            metadata: {
                postId: post.id,
                postTitle: post.title,
                imageUrl: post.featured_image?.url,
            },
        });
    };

    const handleClick = () => {
        trackBlogEvent({
            action: "click",
            category: "post",
            label: post.title,
            metadata: {
                postId: post.id,
                category: post.category.name,
                featured,
            },
        });
    };

    return (
        <article
            className={cn(
                "group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow",
                featured && "md:col-span-2",
            )}
        >
            {/* Image Section */}
            {post.featured_image && !hasImageError && (
                <Link
                    href={`/blog/${post.slug}`}
                    className="relative aspect-video overflow-hidden"
                    onClick={handleClick}
                >
                    <BlogImage
                        image={post.featured_image}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        priority={featured}
                        onError={handleImageError}
                    />
                </Link>
            )}

            {/* Content Section */}
            <div className="flex flex-col p-6">
                {/* Meta Information */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="text-primary-600 font-medium">
                        {post.category.name}
                    </span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.published_at || post.created_at}>
                        {formatDate(post.published_at || post.created_at)}
                    </time>
                    {post.estimated_read_time > 0 && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{post.estimated_read_time} min read</span>
                        </>
                    )}
                </div>

                {/* Title */}
                <Link
                    href={`/blog/${post.slug}`}
                    className="group"
                    onClick={handleClick}
                >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                </p>

                {/* Footer / Call to Action */}
                <div className="mt-auto pt-4">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary-600 font-medium group-hover:text-primary-700"
                        onClick={handleClick}
                    >
                        Read More
                        <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
