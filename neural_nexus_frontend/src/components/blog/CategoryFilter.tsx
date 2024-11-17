// src/components/blog/CategoryFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Category {
    name: string;
    slug: string;
    count?: number;
}

interface CategoryFilterProps {
    categories?: Category[];
}

export function CategoryFilter({ categories = [] }: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

    function handleCategoryChange(categorySlug: string | null) {
        const params = new URLSearchParams(searchParams);
        if (categorySlug) {
            params.set("category", categorySlug);
        } else {
            params.delete("category");
        }
        params.delete("page"); // Reset to first page on category change
        router.push(`/blog?${params.toString()}`);
    }

    return (
        <div className="space-y-2">
            <Button
                variant={!currentCategory ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange(null)}
            >
                All Posts
            </Button>
            {Array.isArray(categories) &&
                categories.map((category) => (
                    <Button
                        key={category.slug}
                        variant={
                            currentCategory === category.slug
                                ? "default"
                                : "outline"
                        }
                        className="w-full justify-start"
                        onClick={() => handleCategoryChange(category.slug)}
                    >
                        {category.name}
                        {category.count && (
                            <span className="ml-auto text-sm text-gray-500">
                                ({category.count})
                            </span>
                        )}
                    </Button>
                ))}
        </div>
    );
}
