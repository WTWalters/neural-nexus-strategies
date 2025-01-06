// Path: neural_nexus_frontend/src/components/providers/TrackingProvider.tsx
"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { tracking } from "@/lib/tracking";
import { Suspense } from "react";

function TrackingWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageView = useCallback(() => {
    tracking.trackEvent("page_view", {
      page: pathname ?? "",
      query: searchParams ? Object.fromEntries(searchParams.entries()) : {},
      title: document.title,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    tracking.initialize().catch(console.error);
  }, []);

  useEffect(() => {
    handlePageView();
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
      <Suspense>
        <TrackingWrapper />
      </Suspense>
      {children}
    </>
  );
}
