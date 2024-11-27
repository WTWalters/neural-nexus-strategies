// src/components/marketing/blog/blog-loading.tsx

import { Card, CardContent } from "@/components/ui/card";

export function BlogLoading() {
    return (
        <div className="space-y-8">
            {/* Search Skeleton */}
            <div className="w-full h-10 bg-gray-100 rounded-md animate-pulse" />

            {/* Posts Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                            {/* Image Skeleton */}
                            <div className="aspect-video bg-gray-100 animate-pulse" />

                            {/* Content Skeleton */}
                            <div className="p-6 space-y-4">
                                {/* Meta Info Skeleton */}
                                <div className="flex gap-2">
                                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                                    <div className="h-4 w-4 bg-gray-100 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                                </div>

                                {/* Title Skeleton */}
                                <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse" />

                                {/* Excerpt Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                                    <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                                </div>

                                {/* Footer Skeleton */}
                                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center gap-2 py-8">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-10 w-10 bg-gray-100 rounded animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
