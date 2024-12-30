// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedInsight from "@/components/marketing/home/featured-insight";
import EnhancedFeaturesSection from "@/components/marketing/home/enhanced-features-section";
import NewsletterBanner from "@/components/marketing/newsletter/NewsletterBanner"; // Add this import
import Layout from "@/components/layout/Layout";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";
import AnimatedMetrics from "@/components/marketing/home/AnimatedMetrics";
import GeometricPatterns from "@/components/marketing/home/GeometricPatterns";

// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <GeometricPatterns />
      <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
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
          <AnimatedMetrics />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookDiscoveryButton size="lg" variant="default" />
            <Button variant="default" size="lg" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>
      <NewsletterBanner />
      <FeaturedInsight />
      <EnhancedFeaturesSection />
    </main>
  );
}
