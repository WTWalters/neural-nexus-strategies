// src/app/blog/loading.tsx
export default function BlogLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-video bg-gray-200 rounded-t-lg" />
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
