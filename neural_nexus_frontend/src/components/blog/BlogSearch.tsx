"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function BlogSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || "",
    );

    function handleSearch(term: string) {
        setSearchTerm(term);
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set("search", term);
            } else {
                params.delete("search");
            }
            router.push(`/blog?${params.toString()}`);
        });
    }

    return (
        <div className="relative">
            <input
                type="search"
                placeholder="Search posts..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent" />
                </div>
            )}
        </div>
    );
}
