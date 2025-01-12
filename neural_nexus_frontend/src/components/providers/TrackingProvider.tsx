// Path: neural_nexus_frontend/src/components/providers/TrackingProvider.tsx
"use client";

import { useEffect, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { tracking } from "@/lib/tracking";

function TrackingWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageView = useCallback(() => {
    try {
      tracking.trackEvent("page_view", {
        page: pathname ?? "",
        query: searchParams ? Object.fromEntries(searchParams.entries()) : {},
        title: document.title,
        url: window.location.href,
        referrer: document.referrer,
        // Add useful GA4 parameters
        language: navigator.language,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      });
    } catch (error) {
      console.warn("Failed to track page view:", error);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const initializeTracking = async () => {
      try {
        await tracking.initialize();
      } catch (error) {
        console.warn("Tracking initialization error:", error);
        // Continue execution even if tracking fails
      }
    };

    initializeTracking();
  }, []);

  useEffect(() => {
    try {
      handlePageView();
    } catch (error) {
      console.warn("Page view tracking error:", error);
    }
  }, [handlePageView]);

  return null;
}

export default function TrackingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <TrackingWrapper />
      </Suspense>
      {children}
    </>
  );
}
