// Path: neural_nexus_frontend/src/app/page.tsx
// src/app/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

// Dynamic imports for client components
const NewsletterBanner = dynamic(
  () => import("@/components/marketing/newsletter/NewsletterBanner"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-32 bg-primary-50" />,
  },
);

const FeaturedInsight = dynamic(
  () => import("@/components/marketing/home/featured-insight"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-48 bg-gray-100" />,
  },
);

const EnhancedFeaturesSection = dynamic(
  () => import("@/components/marketing/home/enhanced-features-section"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-gray-50" />,
  },
);

const AnimatedMetrics = dynamic(
  () => import("@/components/marketing/home/AnimatedMetrics"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-24 bg-gray-100 rounded-lg" />
    ),
  },
);

const GeometricPatterns = dynamic(
  () => import("@/components/marketing/home/GeometricPatterns"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-full bg-primary-50" />,
  },
);

const BookDiscoveryButton = dynamic(
  () =>
    import("@/components/features/booking/BookDiscoveryButton").then(
      (mod) => mod.BookDiscoveryButton,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-12 w-48 bg-primary-100 rounded-md" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Neural Nexus Strategies | Expert Data Leadership & AI Innovation",
  description:
    "Transform your organization with strategic data leadership and AI innovation. Expert Fractional CDO services, data strategy consulting, and AI implementation guidance.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuralnexusstrategies.ai",
    siteName: "Neural Nexus Strategies",
    title: "Expert Data Leadership & AI Innovation | Neural Nexus Strategies",
    description:
      "Transform your organization with strategic data leadership. Fractional CDO services, data strategy, and AI implementation for forward-thinking enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Data Leadership & AI Innovation",
    description:
      "Transform your organization with strategic data leadership and AI innovation.",
  },
  alternates: {
    canonical: "https://neuralnexusstrategies.ai",
  },
};

export const fetchCache = "force-dynamic";

const schemaData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Neural Nexus Strategies",
    url: "https://neuralnexusstrategies.ai",
    description:
      "Expert data leadership and AI innovation consulting for forward-thinking enterprises.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English"],
    },
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Neural Nexus Strategies",
    url: "https://neuralnexusstrategies.ai",
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData.organization),
        }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData.website),
        }}
      />
      <main className="min-h-screen relative bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 overflow-hidden z-0">
          <Suspense
            fallback={<div className="animate-pulse h-full bg-primary-50" />}
          >
            <GeometricPatterns />
          </Suspense>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Transform Your Organization with{" "}
                <span className="text-primary hover:text-primary-darker">
                  Expert Data Leadership
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Strategic data leadership and AI innovation for forward-thinking
                enterprises. Get expert guidance without the full-time executive
                cost.
              </p>

              <Suspense
                fallback={
                  <div className="animate-pulse h-24 bg-gray-100 rounded-lg mb-8" />
                }
              >
                <AnimatedMetrics />
              </Suspense>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Suspense
                  fallback={
                    <div className="animate-pulse h-12 w-48 bg-primary-100 rounded-md" />
                  }
                >
                  <BookDiscoveryButton size="lg" variant="default" />
                </Suspense>

                <Button variant="default" size="lg" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="inline-flex items-center gap-2"
                >
                  <Link href="/services/accelerator/assessment">
                    <span>Take AI Readiness Assessment</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Discover your organization's AI potential in just 5 minutes
              </p>
            </div>
          </div>

          <Suspense
            fallback={<div className="animate-pulse h-32 bg-primary-50" />}
          >
            <NewsletterBanner />
          </Suspense>

          <Suspense
            fallback={<div className="animate-pulse h-48 bg-gray-100" />}
          >
            <FeaturedInsight />
          </Suspense>

          <Suspense
            fallback={<div className="animate-pulse h-96 bg-gray-50" />}
          >
            <EnhancedFeaturesSection />
          </Suspense>
        </div>
      </main>
    </>
  );
}
