// src/app/blog/[slug]/page.tsx
import { getBlogPost } from "@/lib/api/blog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

function formatContent(content: string) {
    // Replace double newlines with paragraph breaks
    const withParagraphs = content
        .split("\n\n")
        .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
        .join("");

    // Replace single newlines with line breaks
    const withLineBreaks = withParagraphs.replace(/\n/g, "<br />");

    return withLineBreaks;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    try {
        const post = await getBlogPost(params.slug);

        return (
            <article className="container mx-auto px-4 py-8 max-w-4xl">
                {/* ... header content remains the same ... */}

                {/* Post content */}
                <div
                    className="prose prose-lg max-w-none
            prose-headings:text-primary-900
            prose-h1:text-3xl
            prose-h2:text-2xl
            prose-h3:text-xl
            prose-p:text-primary-700 prose-p:mb-4
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-primary-500 prose-blockquote:text-primary-700
            prose-strong:text-primary-900
            prose-ul:list-disc prose-ul:pl-4
            prose-ol:list-decimal prose-ol:pl-4
            prose-pre:bg-primary-50 prose-pre:p-4 prose-pre:rounded-lg
            prose-img:rounded-lg
            [&>p]:mb-4 [&>p]:leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: formatContent(post.content),
                    }}
                />

                {/* ... footer content remains the same ... */}
            </article>
        );
    } catch (error) {
        notFound();
    }
}
