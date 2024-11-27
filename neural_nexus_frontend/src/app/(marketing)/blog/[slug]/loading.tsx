// src/app/(marketing)/blog/[slug]/loading.tsx
export default function BlogPostLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Featured Image Skeleton */}
                    <div className="aspect-video bg-gray-200 rounded-lg animate-pulse mb-8" />

                    {/* Content Skeleton */}
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-2">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-4 bg-gray-200 rounded animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="md:w-1/3">
                    <div className="space-y-4">
                        <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-60 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
