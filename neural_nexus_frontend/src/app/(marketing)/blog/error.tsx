// src/app/(marketing)/blog/error.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function BlogError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-8">
                {error.message || "An error occurred while loading the blog."}
            </p>
            <Button onClick={reset}>Try Again</Button>
        </div>
    );
}
