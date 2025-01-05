// src/lib/analytics/types.ts
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}
