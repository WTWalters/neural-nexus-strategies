// src/components/marketing/case-studies/case-study-loading.tsx
export function CaseStudyLoading() {
  return (
    <div className="space-y-8">
      {/* Search and Filter Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full h-10 bg-gray-100 rounded-md animate-pulse" />
        <div className="w-full h-10 bg-gray-100 rounded-md animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="aspect-video bg-gray-100 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              {/* Meta Info Skeleton */}
              <div className="flex gap-2">
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
              </div>

              {/* Title Skeleton */}
              <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse" />

              {/* Excerpt Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
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
