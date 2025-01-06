// Path: neural_nexus_frontend/src/app/test-tracking/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

const TrackingTest = dynamic(() => import("@/components/test/TrackingTest"), {
  ssr: false,
  loading: () => (
    <div className="p-6 m-4 border rounded bg-white shadow animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-32 bg-gray-200 rounded mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
    </div>
  ),
});

export const fetchCache = "force-dynamic";

export default function TestTrackingPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Tracking System Test</h1>
      <Suspense
        fallback={
          <div className="p-6 m-4 border rounded bg-white shadow animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        }
      >
        <TrackingTest />
      </Suspense>
    </div>
  );
}
