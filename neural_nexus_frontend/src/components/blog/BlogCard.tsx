// src/components/blog/BlogCard.tsx
// src/components/blog/BlogCard.tsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/api/blog";
import { cn, formatContent } from "@/lib/utils";
import Link from "next/link";

interface BlogCardProps {
    post: BlogPost;
    variant?: "default" | "featured";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
    const excerpt =
        post.excerpt ||
        (post.content ? post.content.slice(0, 150) + "..." : "");

    return (
        <Card
            className={cn(
                "transition-shadow hover:shadow-lg bg-white",
                variant === "featured"
                    ? "border-primary-500"
                    : "border-primary-200",
            )}
        >
            {post.featured_image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-primary-600">
                    <span>
                        {new Date(post.published_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{post.category.name}</span>
                </div>
                <CardTitle className="text-primary-900">{post.title}</CardTitle>
                <div className="text-primary-700 line-clamp-3">
                    {formatContent(excerpt, true)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="text-sm text-primary-600">
                        By {post.author.username}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-primary-600 border-primary-600 hover:bg-primary-50"
                    >
                        <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
