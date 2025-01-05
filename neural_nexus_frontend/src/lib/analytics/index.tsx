// src/lib/analytics/index.ts
import { AnalyticsEvent } from "./types";

// Basic tracking function for blog events
export const trackBlogEvent = (event: AnalyticsEvent): void => {
  // Add Google Analytics tracking
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.metadata,
    });
  }
};

export type { AnalyticsEvent };
