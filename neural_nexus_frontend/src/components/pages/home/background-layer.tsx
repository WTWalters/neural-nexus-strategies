import { Suspense } from "react";
import { GeometricPatterns } from "@/components/dynamic";
import { BannerSkeleton } from "@/components/ui/loading-skeleton";

export function BackgroundLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <Suspense fallback={<BannerSkeleton />}>
        <GeometricPatterns />
      </Suspense>
    </div>
  );
}