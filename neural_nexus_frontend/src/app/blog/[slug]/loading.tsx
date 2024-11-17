// src/app/blog/[slug]/loading.tsx
export default function BlogPostLoading() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="animate-pulse">
                <div className="h-8 w-24 bg-gray-200 rounded mb-8" />
                <div className="aspect-video w-full bg-gray-200 rounded-lg mb-6" />
                <div className="h-12 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="flex space-x-4 mb-8">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="space-y-4">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}
