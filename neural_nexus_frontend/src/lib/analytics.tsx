// src/lib/analytics/index.ts

export interface AnalyticsEvent {
    category: string;
    action: string;
    label?: string;
    value?: number;
    metadata?: Record<string, any>;
}

export interface ErrorEvent {
    error: Error;
    errorInfo?: any;
    component?: string;
    location?: string;
}

export function trackBlogEvent(event: AnalyticsEvent) {
    if (typeof window !== "undefined") {
        window.gtag?.("event", event.action, {
            event_category: event.category,
            event_label: event.label,
            value: event.value,
            ...event.metadata,
        });
    }
}

export function trackError({
    error,
    errorInfo,
    component,
    location,
}: ErrorEvent) {
    if (typeof window !== "undefined") {
        window.gtag?.("event", "error", {
            event_category: "error",
            event_label: error.message,
            error_name: error.name,
            error_stack: error.stack,
            error_component: component,
            error_location: location,
            error_info: JSON.stringify(errorInfo),
        });
    }
}
