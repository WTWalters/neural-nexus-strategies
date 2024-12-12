// src/components/marketing/case-studies/case-study-analytics.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackBlogEvent, type AnalyticsEvent } from "@/lib/analytics";

export function CaseStudyAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Use the existing trackBlogEvent function
    trackBlogEvent({
      category: "page_view",
      action: "view_case_studies",
      label: pathname,
      metadata: {
        path: pathname,
        search: searchParams.toString(),
        title: "Case Studies",
      },
    });
  }, [pathname, searchParams]);

  return null;
}

export function trackCaseStudyEvent({
  action,
  label,
  value,
  metadata,
}: Omit<AnalyticsEvent, "category">) {
  return trackBlogEvent({
    category: "case_study",
    action,
    label,
    value,
    metadata,
  });
}

function trackPageView({
  path,
  search,
  title,
}: {
  path: string;
  search: string;
  title?: string;
}) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", "page_view", {
      page_path: path,
      page_search: search,
      page_title: title,
    });
  }
}
