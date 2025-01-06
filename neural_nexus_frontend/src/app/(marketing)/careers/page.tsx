// Path: neural_nexus_frontend/src/app/(marketing)/careers/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CareersContent = dynamic(
  () => import("@/components/marketing/careers/CareersContent"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-100 mb-8"></div>
        <div className="h-96 bg-gray-100"></div>
      </div>
    ),
  },
);

export const fetchCache = "force-dynamic";

export default function CareersPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-64 bg-gray-100 mb-8"></div>
          <div className="h-96 bg-gray-100"></div>
        </div>
      }
    >
      <CareersContent />
    </Suspense>
  );
}
