// src/components/marketing/blog/blog-list.tsx

import { getBlogPosts } from "@/lib/api/blog";
import { BlogCard } from "./blog-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogListProps {
    page: number;
    category?: string;
    tag?: string;
    search?: string;
}

export async function BlogList({ page, category, tag, search }: BlogListProps) {
    try {
        const posts = await getBlogPosts({
            page,
            category,
            tag,
            search,
            per_page: 10,
        });
        // Log the API call
        console.log("API call response:", posts);

        // Calculate total pages from posts length
        const PER_PAGE = 10;
        const totalItems = posts.length; // This should come from API total count
        const totalPages = Math.ceil(totalItems / PER_PAGE);

        if (posts.length === 0) {
            return (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        No posts found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {search && `No articles matching "${search}"`}
                        {category &&
                            !search &&
                            `No articles in category "${category}"`}
                        {tag &&
                            !search &&
                            !category &&
                            `No articles with tag "${tag}"`}
                        {!search &&
                            !category &&
                            !tag &&
                            "No articles available"}
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/blog">View all posts</Link>
                    </Button>
                </div>
            );
        }

        return (
            <div className="space-y-8">
                {/* Search Results Header */}
                {search && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Search Results: "{search}"
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Found {totalItems}{" "}
                            {totalItems === 1 ? "article" : "articles"}
                        </p>
                    </div>
                )}

                {/* Grid of Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            featured={
                                index === 0 &&
                                page === 1 &&
                                !search &&
                                !category &&
                                !tag
                            }
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav
                        className="flex justify-center items-center gap-2 py-8"
                        aria-label="Blog pagination"
                    >
                        {/* Previous Page */}
                        {page > 1 && (
                            <Link
                                href={{
                                    pathname: "/blog",
                                    query: {
                                        ...(category && { category }),
                                        ...(tag && { tag }),
                                        ...(search && { search }),
                                        page: page - 1,
                                    },
                                }}
                                className="inline-flex"
                            >
                                <Button variant="outline" className="gap-2">
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                            </Link>
                        )}

                        {/* Page Numbers */}
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(
                                    (p) =>
                                        p === 1 ||
                                        p === totalPages ||
                                        Math.abs(p - page) <= 1,
                                )
                                .map((p, index, array) => (
                                    <React.Fragment key={p}>
                                        {index > 0 &&
                                            array[index - 1] !== p - 1 && (
                                                <span className="px-2 text-gray-500">
                                                    ...
                                                </span>
                                            )}
                                        <Link
                                            href={{
                                                pathname: "/blog",
                                                query: {
                                                    ...(category && {
                                                        category,
                                                    }),
                                                    ...(tag && { tag }),
                                                    ...(search && { search }),
                                                    page: p,
                                                },
                                            }}
                                            className="inline-flex"
                                        >
                                            <Button
                                                variant={
                                                    page === p
                                                        ? "default"
                                                        : "outline"
                                                }
                                                aria-current={
                                                    page === p
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {p}
                                            </Button>
                                        </Link>
                                    </React.Fragment>
                                ))}
                        </div>

                        {/* Next Page */}
                        {page < totalPages && (
                            <Link
                                href={{
                                    pathname: "/blog",
                                    query: {
                                        ...(category && { category }),
                                        ...(tag && { tag }),
                                        ...(search && { search }),
                                        page: page + 1,
                                    },
                                }}
                                className="inline-flex"
                            >
                                <Button variant="outline" className="gap-2">
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        )}
                    </nav>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error in BlogList:", error);
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Unable to load blog posts</p>
            </div>
        );
    }
}
