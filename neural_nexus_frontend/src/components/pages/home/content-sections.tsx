import { Suspense } from "react";
import { 
  NewsletterBanner, 
  FeaturedInsight, 
  EnhancedFeaturesSection 
} from "@/components/dynamic";
import { 
  BannerSkeleton, 
  CardSkeleton, 
  FeaturesSkeleton 
} from "@/components/ui/loading-skeleton";

export function ContentSections() {
  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <NewsletterBanner />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <FeaturedInsight />
      </Suspense>
      <Suspense fallback={<FeaturesSkeleton />}>
        <EnhancedFeaturesSection />
      </Suspense>
    </>
  );
}