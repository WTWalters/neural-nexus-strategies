// Path: neural_nexus_frontend/src/app/services/data-strategy/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

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

export function generateMetadata(): Metadata {
  return {
    title: "Data Strategy Consulting Services | Neural Nexus Strategies",
    description:
      "Transform your organization with expert data strategy consulting. Comprehensive data solutions from assessment to implementation. Drive business value through strategic data initiatives.",
    keywords: [
      "data strategy",
      "data strategy consulting",
      "data transformation",
      "data maturity assessment",
      "data governance",
      "data analytics strategy",
      "data roadmap",
      "AI strategy",
      "digital transformation",
      "data consulting",
      "business intelligence strategy",
    ].join(", "),
    openGraph: {
      title: "Data Strategy Consulting Services | Neural Nexus Strategies",
      description:
        "Expert data strategy consulting to transform your organization. Build a comprehensive data roadmap that drives business value.",
      type: "website",
      locale: "en_US",
      url: "https://neuralnexusstrategies.ai/services/data-strategy",
      siteName: "Neural Nexus Strategies",
      images: [
        {
          url: "https://neuralnexusstrategies.ai/images/data-strategy-og.jpg",
          width: 1200,
          height: 630,
          alt: "Data Strategy Consulting Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Data Strategy Consulting Services",
      description:
        "Transform your organization with expert data strategy consulting. From assessment to implementation.",
    },
    alternates: {
      canonical: "https://neuralnexusstrategies.ai/services/data-strategy",
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
          <meta itemProp="name" content="Data Strategy Consulting Services" />
          <meta
            itemProp="description"
            content="Expert data strategy consulting helping organizations transform through comprehensive data solutions and strategic initiatives."
          />
          <meta itemProp="serviceType" content="Data Strategy Consulting" />
          <meta itemProp="areaServed" content="Worldwide" />

          <DataStrategyContent />
        </article>
      </main>
    </Suspense>
  );
}
