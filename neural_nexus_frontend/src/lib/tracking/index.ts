export * from "./types";
export * from "./trackingService";
export * from "./deviceFingerprint";
export * from "./sessionManager";

// Create and export a default instance
import { TrackingService } from "./trackingService";

const defaultConfig = {
  sessionTimeout: 30,
  anonymousIdPrefix: "nns",
  apiEndpoint: "/api/tracking",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
};

export const tracking = TrackingService.getInstance(defaultConfig);
