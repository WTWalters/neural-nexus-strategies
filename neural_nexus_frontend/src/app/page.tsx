// Path: neural_nexus_frontend/src/app/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export const fetchCache = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Container for patterns with specific z-index */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <Suspense
          fallback={<div className="animate-pulse h-full bg-primary-50" />}
        >
          <GeometricPatterns />
        </Suspense>
      </div>

      {/* Content container with higher z-index */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </div>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-primary-50" />}
        >
          <NewsletterBanner />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-48 bg-gray-100" />}>
          <FeaturedInsight />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-50" />}>
          <EnhancedFeaturesSection />
        </Suspense>
      </div>
    </main>
  );
}
