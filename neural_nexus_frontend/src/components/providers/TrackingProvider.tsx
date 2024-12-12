"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { tracking } from "@/lib/tracking";

export default function TrackingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  const handlePageView = useCallback(() => {
    tracking.trackEvent("page_view", {
      page: pathname,
      query: Object.fromEntries(searchParams.entries()),
      title: document.title,
    });
  }, [pathname, searchParams]);

  // Initialize tracking
  useEffect(() => {
    tracking.initialize().catch(console.error);
  }, []);

  // Track page views on navigation
  useEffect(() => {
    handlePageView();
  }, [handlePageView]);

  return <>{children}</>;
}
