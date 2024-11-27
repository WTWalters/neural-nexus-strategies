// src/components/marketing/blog/blog-search.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export function BlogSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get("search") as string;

        if (searchTerm.trim()) {
            startTransition(() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("search", searchTerm.trim());
                params.delete("page");

                console.log("Searching with term:", searchTerm.trim());
                router.push(`/blog?${params.toString()}`);
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <Input
                name="search"
                type="search"
                placeholder="Search articles..."
                defaultValue={searchParams.get("search") ?? ""}
                className="pl-10"
                aria-label="Search articles"
            />
            <button
                type="submit"
                className="absolute left-3 top-2.5"
                aria-label="Search"
            >
                <SearchIcon
                    className={`h-5 w-5 ${
                        isPending ? "text-primary-500" : "text-gray-400"
                    }`}
                />
            </button>
            {isPending && (
                <div className="absolute right-3 top-2.5">
                    <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent" />
                </div>
            )}
        </form>
    );
}
