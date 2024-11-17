// src/app/blog/page.tsx
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";
import { getBlogPosts, getFeaturedPosts } from "@/lib/api/blog";

interface BlogPageProps {
    searchParams?: {
        page?: string;
        search?: string;
        category?: string;
    };
}

export default async function BlogPage({ searchParams = {} }: BlogPageProps) {
    // Get the current page number from searchParams, default to 1
    const currentPage = Number(searchParams.page || 1);

    try {
        const [posts, featuredPosts] = await Promise.all([
            getBlogPosts(
                currentPage,
                searchParams.search,
                searchParams.category,
            ),
            getFeaturedPosts(),
        ]);

        return (
            <>
                <div className="mb-8">
                    <BlogSearch />
                </div>

                {featuredPosts?.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">
                            Featured Posts
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {featuredPosts.map((post) => (
                                <BlogCard
                                    key={post.slug}
                                    post={post}
                                    variant="featured"
                                />
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
                    {posts?.results?.length > 0 ? (
                        <>
                            <div className="grid gap-6 md:grid-cols-2">
                                {posts.results.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>

                            <Pagination
                                totalPages={Math.ceil(posts.count / 10)}
                                currentPage={currentPage}
                            />
                        </>
                    ) : (
                        <p className="text-gray-500 text-center py-12">
                            No blog posts found. Check back soon!
                        </p>
                    )}
                </section>
            </>
        );
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p>Error loading blog posts. Please try again later.</p>
            </div>
        );
    }
}
