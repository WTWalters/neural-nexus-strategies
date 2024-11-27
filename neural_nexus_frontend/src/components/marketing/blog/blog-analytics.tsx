// src/components/marketing/blog/blog-analytics.tsx

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface AnalyticsEvent {
    category: string;
    action: string;
    label?: string;
    value?: number;
}

interface PageView {
    path: string;
    search?: string;
    title?: string;
}

export function BlogAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Track page view
        trackPageView({
            path: pathname,
            search: searchParams.toString(),
            title: "Blog",
        });
    }, [pathname, searchParams]);

    return null;
}

// Renamed from trackEvent to trackAnalyticsEvent to avoid conflict
function trackPageView({ path, search, title }: PageView) {
    if (typeof window !== "undefined") {
        window.gtag?.("event", "page_view", {
            page_path: path,
            page_search: search,
            page_title: title,
        });
    }
}

// Moved to separate analytics utility file
// src/lib/analytics/index.ts
export function trackBlogEvent({
    category,
    action,
    label,
    value,
}: AnalyticsEvent) {
    if (typeof window !== "undefined") {
        window.gtag?.("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}
