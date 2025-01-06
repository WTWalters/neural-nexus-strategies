// Path: neural_nexus_frontend/src/app/services/fractional-cdo/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic import for client components
const FractionalCDOContent = dynamic(
  () => import("@/components/services/fractional-cdo/FractionalCDOContent"),
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

export default function FractionalCDOPage() {
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
      <FractionalCDOContent />
    </Suspense>
  );
}
