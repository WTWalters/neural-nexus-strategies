// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedInsight from "@/components/marketing/home/featured-insight";
import EnhancedFeaturesSection from "@/components/marketing/home/enhanced-features-section";
import NewsletterBanner from "@/components/marketing/newsletter/NewsletterBanner"; // Add this import
import Layout from "@/components/layout/Layout";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background-subtle">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookDiscoveryButton size="lg" variant="default" />
              <Button variant="default" size="lg" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <NewsletterBanner />

      {/* Adding Featured Insight */}
      <FeaturedInsight />

      {/* Use the component instead of inline features */}
      <EnhancedFeaturesSection />
    </main>
  );
}
