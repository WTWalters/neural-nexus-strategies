// Path: neural_nexus_frontend/src/app/services/data-strategy/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic import for client components
const DataStrategyContent = dynamic(
  () => import("@/components/services/data-strategy/DataStrategyContent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-100 rounded-lg mb-8 w-full max-w-4xl"></div>
          <div className="h-96 bg-gray-100 rounded-lg w-full max-w-4xl"></div>
        </div>
      </div>
    ),
  },
);

export const fetchCache = "force-dynamic";

export default function DataStrategyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-100 rounded-lg mb-8 w-full max-w-4xl"></div>
            <div className="h-96 bg-gray-100 rounded-lg w-full max-w-4xl"></div>
          </div>
        </div>
      }
    >
      <DataStrategyContent />
    </Suspense>
  );
}
