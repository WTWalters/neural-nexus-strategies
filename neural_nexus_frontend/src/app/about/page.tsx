// Path: neural_nexus_frontend/src/app/about/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Import the client components dynamically
const AboutContent = dynamic(() => import("@/components/about/AboutContent"), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-100 mb-8"></div>
      <div className="h-64 bg-gray-100"></div>
    </div>
  ),
  ssr: true, // We can enable SSR for this component since it doesn't use searchParams
});

export const fetchCache = "force-dynamic";

export default function AboutPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-96 bg-gray-100 mb-8"></div>
          <div className="h-64 bg-gray-100"></div>
        </div>
      }
    >
      <AboutContent />
    </Suspense>
  );
}
