import { cn } from "@/lib/utils";

interface SkeletonProps {
  height: string;
  width?: string;
  className?: string;
}

export const ComponentSkeleton = ({ 
  height, 
  width = "full", 
  className 
}: SkeletonProps) => (
  <div 
    className={cn(
      "animate-pulse bg-gray-100 rounded", 
      `h-${height}`, 
      `w-${width}`, 
      className
    )} 
  />
);

// Specific skeleton patterns for common components
export const NavigationSkeleton = () => (
  <ComponentSkeleton height="16" width="32" className="bg-gray-200" />
);

export const ButtonSkeleton = () => (
  <ComponentSkeleton height="12" width="48" className="bg-primary-100 rounded-md" />
);

export const CardSkeleton = () => (
  <ComponentSkeleton height="48" className="bg-gray-50 rounded-lg" />
);

export const BannerSkeleton = () => (
  <ComponentSkeleton height="32" className="bg-primary-50" />
);

export const MetricsSkeleton = () => (
  <ComponentSkeleton height="24" className="bg-gray-100 rounded-lg" />
);

export const FeaturesSkeleton = () => (
  <ComponentSkeleton height="96" className="bg-gray-50" />
);