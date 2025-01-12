// Path: neural_nexus_frontend/src/app/services/fractional-cdo/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

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

export function generateMetadata(): Metadata {
  return {
    title:
      "Fractional Chief Data Officer (CDO) Services | Neural Nexus Strategies",
    description:
      "Transform your organization with expert Fractional CDO services. Get the benefits of a Chief Data Officer without the full-time cost. Strategic data leadership for modern businesses.",
    keywords: [
      "Fractional CDO",
      "Chief Data Officer",
      "Fractional Chief Data Officer",
      "data strategy",
      "executive data leadership",
      "part-time CDO",
      "data governance",
      "data leadership",
      "data transformation",
      "AI strategy",
    ].join(", "),
    openGraph: {
      title:
        "Fractional Chief Data Officer (CDO) Services | Neural Nexus Strategies",
      description:
        "Get expert Chief Data Officer leadership without the full-time commitment. Transform your data strategy with our Fractional CDO services.",
      type: "website",
      locale: "en_US",
      url: "https://neuralnexusstrategies.ai/services/fractional-cdo",
      siteName: "Neural Nexus Strategies",
      images: [
        {
          url: "https://neuralnexusstrategies.ai/images/fractional-cdo-og.jpg",
          width: 1200,
          height: 630,
          alt: "Fractional Chief Data Officer Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fractional Chief Data Officer Services",
      description:
        "Expert Fractional CDO services for modern businesses. Transform your data strategy with experienced leadership.",
    },
    alternates: {
      canonical: "https://neuralnexusstrategies.ai/services/fractional-cdo",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Force dynamic rendering for fresh content
export const fetchCache = "force-dynamic";

// Add page revalidation
export const revalidate = 3600; // Revalidate every hour

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
      <main className="min-h-screen">
        <article
          itemScope
          itemType="https://schema.org/Service"
          className="h-full"
        >
          <div
            itemProp="provider"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <meta itemProp="name" content="Neural Nexus Strategies" />
            <meta itemProp="url" content="https://neuralnexusstrategies.ai" />
          </div>
          <meta
            itemProp="name"
            content="Fractional Chief Data Officer Services"
          />
          <meta
            itemProp="description"
            content="Expert Fractional CDO services helping organizations transform through data-driven strategy and leadership."
          />
          <meta itemProp="serviceType" content="Fractional CDO Services" />
          <meta itemProp="areaServed" content="Worldwide" />

          <FractionalCDOContent />
        </article>
      </main>
    </Suspense>
  );
}
