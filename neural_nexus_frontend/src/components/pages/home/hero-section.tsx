import { Suspense } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { AnimatedMetrics, BookDiscoveryButton } from "@/components/dynamic";
import { MetricsSkeleton, ButtonSkeleton } from "@/components/ui/loading-skeleton";

export function HeroSection() {
  return (
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
        <Suspense fallback={<MetricsSkeleton />}>
          <AnimatedMetrics />
        </Suspense>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Suspense fallback={<ButtonSkeleton />}>
            <BookDiscoveryButton size="lg" variant="default" />
          </Suspense>
          <ActionLink href="/services" variant="default" size="lg">
            Explore Services
          </ActionLink>
        </div>
      </div>
    </div>
  );
}