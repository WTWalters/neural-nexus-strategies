import dynamic from "next/dynamic";
import { 
  BannerSkeleton, 
  CardSkeleton, 
  FeaturesSkeleton, 
  MetricsSkeleton, 
  ButtonSkeleton 
} from "@/components/ui/loading-skeleton";

// Marketing Components
export const NewsletterBanner = dynamic(
  () => import("@/components/marketing/newsletter/NewsletterBanner"),
  {
    ssr: false,
    loading: () => <BannerSkeleton />,
  },
);

export const FeaturedInsight = dynamic(
  () => import("@/components/marketing/home/featured-insight"),
  {
    ssr: false,
    loading: () => <CardSkeleton />,
  },
);

export const EnhancedFeaturesSection = dynamic(
  () => import("@/components/marketing/home/enhanced-features-section"),
  {
    ssr: false,
    loading: () => <FeaturesSkeleton />,
  },
);

// Animation Components
export const AnimatedMetrics = dynamic(
  () => import("@/components/marketing/home/AnimatedMetrics"),
  {
    ssr: false,
    loading: () => <MetricsSkeleton />,
  },
);

export const GeometricPatterns = dynamic(
  () => import("@/components/marketing/home/GeometricPatterns"),
  {
    ssr: false,
    loading: () => <BannerSkeleton />,
  },
);

// Feature Components
export const BookDiscoveryButton = dynamic(
  () =>
    import("@/components/features/booking/BookDiscoveryButton").then(
      (mod) => mod.BookDiscoveryButton,
    ),
  {
    ssr: false,
    loading: () => <ButtonSkeleton />,
  },
);

// Additional dynamic components can be added here following the same pattern
// Example:
// export const ContactForm = dynamic(
//   () => import("@/components/forms/ContactForm"),
//   {
//     ssr: false,
//     loading: () => <CardSkeleton />,
//   },
// );