// Path: neural_nexus_frontend/src/app/services/ai-readiness/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

// Dynamic import for client components
const AIReadinessContent = dynamic(
  () => import("@/components/services/ai-readiness/AIReadinessContent"),
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
      "AI Readiness Assessment & Implementation Services | Neural Nexus Strategies",
    description:
      "Transform your organization with our comprehensive AI readiness assessment and implementation services. Expert guidance for successful AI adoption and integration.",
    keywords: [
      "AI readiness assessment",
      "AI implementation",
      "artificial intelligence consulting",
      "AI transformation",
      "AI strategy",
      "AI adoption",
      "AI maturity assessment",
      "enterprise AI",
      "AI consulting",
      "machine learning implementation",
      "AI ROI assessment",
    ].join(", "),
    openGraph: {
      title:
        "AI Readiness Assessment & Implementation | Neural Nexus Strategies",
      description:
        "Expert AI readiness assessment and implementation services. Transform your organization with strategic AI adoption.",
      type: "website",
      locale: "en_US",
      url: "https://neuralnexusstrategies.ai/services/ai-readiness",
      siteName: "Neural Nexus Strategies",
      images: [
        {
          url: "https://neuralnexusstrategies.ai/images/ai-readiness-og.jpg",
          width: 1200,
          height: 630,
          alt: "AI Readiness Assessment Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Readiness Assessment Services",
      description:
        "Transform your organization with expert AI readiness assessment and implementation services.",
    },
    alternates: {
      canonical: "https://neuralnexusstrategies.ai/services/ai-readiness",
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

export default function AIReadinessPage() {
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
          <meta itemProp="name" content="AI Readiness Assessment Services" />
          <meta
            itemProp="description"
            content="Comprehensive AI readiness assessment and implementation services helping organizations succeed with artificial intelligence adoption."
          />
          <meta itemProp="serviceType" content="AI Consulting" />
          <meta itemProp="areaServed" content="Worldwide" />

          <AIReadinessContent />
        </article>
      </main>
    </Suspense>
  );
}
