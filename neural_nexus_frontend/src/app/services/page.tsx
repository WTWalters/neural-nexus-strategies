// Path: neural_nexus_frontend/src/app/services/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the client component
const ServicesContent = dynamic(
  () => import("@/components/services/ServicesContent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-xl">Loading services...</div>
      </div>
    ),
  },
);

export const fetchCache = "force-dynamic";

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="text-xl">Loading services...</div>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
