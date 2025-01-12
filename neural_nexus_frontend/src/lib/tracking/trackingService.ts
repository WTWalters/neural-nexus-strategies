// Path: neural_nexus_frontend/src/lib/tracking/trackingService.ts

import { DeviceFingerprint } from "./deviceFingerprint";
import { SessionManager } from "./sessionManager";
import { env } from "@/config/env";
import {
  UserIdentity,
  TrackingEvent,
  DeviceInfo,
  ConsentSettings,
  TrackingConfig,
} from "./types";

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
    ga?: {
      getAll?: () => Array<{
        get: (key: string) => string;
      }>;
    };
  }
}

export class TrackingService {
  private static instance: TrackingService;
  private deviceFingerprint: DeviceFingerprint;
  private identity: UserIdentity;
  private deviceInfo: DeviceInfo | null = null;
  private config: TrackingConfig;
  private consent: ConsentSettings;
  private initialized: boolean = false;

  public async getDeviceInfo(): Promise<DeviceInfo> {
    return this.deviceFingerprint.getDeviceInfo();
  }

  private constructor(config: TrackingConfig) {
    if (typeof window === "undefined") {
      console.warn("TrackingService initialized in server environment");
    }
    this.config = config;
    this.deviceFingerprint = DeviceFingerprint.getInstance();
    this.consent = this.loadConsent();
    this.identity = this.loadIdentity();
  }

  public static getInstance(config: TrackingConfig): TrackingService {
    if (typeof window === "undefined") {
      // Return a dummy instance for SSR
      return new TrackingService(config);
    }
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService(config);
    }
    return TrackingService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      if (this.initialized) return;

      // Initialize device info
      this.deviceInfo = await this.deviceFingerprint.getDeviceInfo();

      // Initialize session
      const session = SessionManager.initSession();

      // Update identity with session and device info
      this.identity = {
        ...this.identity,
        deviceId: this.deviceInfo.deviceId,
        sessionId: session.sessionId,
      };

      // Initialize Google Analytics if configured
      if (this.config.googleAnalyticsId && this.consent.analytics) {
        await this.initializeGA();
      }

      this.initialized = true;
    } catch (error) {
      console.warn("Failed to initialize tracking:", error);
      // Continue execution even if tracking fails
    }
  }

  public async trackEvent(
    eventName: string,
    properties: Record<string, any> = {},
  ): Promise<void> {
    if (!this.consent.analytics) return;

    try {
      const event: TrackingEvent = {
        eventName,
        timestamp: Date.now(),
        identity: this.identity,
        properties,
        source: window.location.hostname,
        path: window.location.pathname,
      };

      // Send to our backend first as fallback
      await this.sendToBackend(event);

      // Attempt to send to Google Analytics
      if (this.config.googleAnalyticsId) {
        this.sendToGA(event);
      }
    } catch (error) {
      console.warn("Failed to track event:", error);
    }
  }

  public identifyUser(
    email: string,
    properties: Record<string, any> = {},
  ): void {
    try {
      this.identity = {
        ...this.identity,
        type: "known",
        email,
        primaryEmail: email,
      };

      this.saveIdentity();
      this.trackEvent("user_identified", properties);
    } catch (error) {
      console.warn("Failed to identify user:", error);
    }
  }

  public updateConsent(settings: Partial<ConsentSettings>): void {
    try {
      this.consent = {
        ...this.consent,
        ...settings,
        updatedAt: Date.now(),
      };
      localStorage.setItem("nns_consent", JSON.stringify(this.consent));
    } catch (error) {
      console.warn("Failed to update consent:", error);
    }
  }

  private async sendToBackend(event: TrackingEvent): Promise<void> {
    try {
      const baseUrl = new URL(
        "/api/content/tracking/",
        env.NEXT_PUBLIC_API_URL,
      );
      const response = await fetch(baseUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.warn("Failed to send event to backend:", error);
    }
  }

  // Update the sendToGA method to include more parameters:
  private sendToGA(event: TrackingEvent): void {
    if (!window.gtag) return;

    try {
      // Enhanced common parameters
      const commonParams = {
        session_id: this.identity.sessionId,
        user_id: this.identity.id,
        client_id:
          window.ga?.getAll?.()?.[0]?.get?.("clientId") ||
          this.identity.anonymousId,
        page_location: window.location.href,
        page_referrer: document.referrer,
        page_title: document.title,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        engagement_time_msec: 10,
        language: navigator.language,
        is_first_visit: !localStorage.getItem("_ga"),
        session_engaged: true,
        session_start: this.isNewSession(),
        // Add these new parameters
        page_encoding: document.characterSet,
        user_agent: navigator.userAgent,
        host: window.location.host,
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
        // Time zone information
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezone_offset: new Date().getTimezoneOffset(),
      };

      if (event.eventName === "page_view") {
        window.gtag("event", "page_view", {
          ...commonParams,
          ...event.properties,
          // Page-specific parameters
          page_type: this.getPageType(window.location.pathname),
          navigation_type: this.getNavigationType(),
          performance_timing: this.getPerformanceTiming(),
        });
      } else {
        window.gtag("event", event.eventName, {
          ...commonParams,
          ...event.properties,
        });
      }
    } catch (error) {
      console.warn("Failed to send event to Google Analytics:", error);
    }
  }

  // Add helper methods for enhanced tracking
  private getPageType(pathname: string): string {
    if (pathname === "/") return "home";
    const segments = pathname.split("/").filter(Boolean);
    return segments[0] || "unknown";
  }

  private getNavigationType(): string {
    if (
      typeof window === "undefined" ||
      !window.performance ||
      !window.performance.navigation
    ) {
      return "unknown";
    }
    const navigation = window.performance.navigation;
    switch (navigation.type) {
      case 0:
        return "navigate";
      case 1:
        return "reload";
      case 2:
        return "back_forward";
      default:
        return "unknown";
    }
  }

  private getPerformanceTiming(): Record<string, number> {
    if (
      typeof window === "undefined" ||
      !window.performance ||
      !window.performance.timing
    ) {
      return {};
    }

    const timing = window.performance.timing;
    return {
      dns_time: timing.domainLookupEnd - timing.domainLookupStart,
      connection_time: timing.connectEnd - timing.connectStart,
      ttfb: timing.responseStart - timing.requestStart,
      dom_load_time: timing.domContentLoadedEventEnd - timing.navigationStart,
      page_load_time: timing.loadEventEnd - timing.navigationStart,
    };
  }

  private async initializeGA(): Promise<void> {
    try {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;

      // Add proper error handling for script loading
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      });

      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args) {
        window.dataLayer.push(args);
      };

      window.gtag("js", new Date());
      window.gtag("config", this.config.googleAnalyticsId!, {
        send_page_view: true,
        cookie_domain: "neuralnexusstrategies.ai",
        anonymize_ip: true,
        transport_url: window.location.origin,
        first_party_collection: true,
      });
    } catch (error) {
      console.warn("Failed to initialize Google Analytics:", error);
      // Continue execution even if GA fails
    }
  }

  private isNewSession(): boolean {
    const lastHit = localStorage.getItem("_ga_last_hit");
    const now = Date.now();
    if (!lastHit) {
      localStorage.setItem("_ga_last_hit", now.toString());
      return true;
    }
    const timeSinceLastHit = now - parseInt(lastHit);
    const isNew = timeSinceLastHit > 30 * 60 * 1000; // 30 minutes
    localStorage.setItem("_ga_last_hit", now.toString());
    return isNew;
  }

  private loadIdentity(): UserIdentity {
    if (typeof window === "undefined") {
      return {
        id: null,
        type: "anonymous",
        anonymousId: this.generateAnonymousId(),
      };
    }

    try {
      const stored = localStorage.getItem("nns_identity");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to load identity from storage:", error);
    }

    return {
      id: null,
      type: "anonymous",
      anonymousId: this.generateAnonymousId(),
    };
  }

  private loadConsent(): ConsentSettings {
    if (typeof window === "undefined") {
      return {
        marketing: true,
        analytics: true,
        updatedAt: Date.now(),
      };
    }

    try {
      const stored = localStorage.getItem("nns_consent");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to load consent from storage:", error);
    }

    return {
      marketing: true,
      analytics: true,
      updatedAt: Date.now(),
    };
  }

  private saveIdentity(): void {
    try {
      localStorage.setItem("nns_identity", JSON.stringify(this.identity));
    } catch (error) {
      console.warn("Failed to save identity:", error);
    }
  }

  private generateAnonymousId(): string {
    return `${this.config.anonymousIdPrefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
