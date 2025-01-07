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
  }
}

export class TrackingService {
  private static instance: TrackingService;
  private deviceFingerprint: DeviceFingerprint;
  private identity: UserIdentity;
  private deviceInfo: DeviceInfo | null = null;
  private config: TrackingConfig;
  private consent: ConsentSettings;

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
      this.initializeGA();
    }
  }

  public async trackEvent(
    eventName: string,
    properties: Record<string, any> = {},
  ): Promise<void> {
    if (!this.consent.analytics) return;

    const event: TrackingEvent = {
      eventName,
      timestamp: Date.now(),
      identity: this.identity,
      properties,
      source: window.location.hostname,
      path: window.location.pathname,
    };

    // Send to our backend
    await this.sendToBackend(event);

    // Send to Google Analytics
    if (this.config.googleAnalyticsId) {
      this.sendToGA(event);
    }
  }

  public identifyUser(
    email: string,
    properties: Record<string, any> = {},
  ): void {
    this.identity = {
      ...this.identity,
      type: "known",
      email,
      primaryEmail: email,
    };

    this.saveIdentity();
    this.trackEvent("user_identified", properties);
  }

  public updateConsent(settings: Partial<ConsentSettings>): void {
    this.consent = {
      ...this.consent,
      ...settings,
      updatedAt: Date.now(),
    };
    localStorage.setItem("nns_consent", JSON.stringify(this.consent));
  }

  private async sendToBackend(event: TrackingEvent): Promise<void> {
    try {
      const baseUrl = new URL(
        "/api/content/tracking/",
        env.NEXT_PUBLIC_API_URL,
      );
      await fetch(baseUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("Failed to send event to backend:", error);
    }
  }

  private sendToGA(event: TrackingEvent): void {
    if (!window.gtag) return;

    window.gtag("event", event.eventName, {
      ...event.properties,
      user_id: this.identity.id,
      session_id: this.identity.sessionId,
    });
  }

  private initializeGA(): void {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", this.config.googleAnalyticsId!, {
      send_page_view: false,
    });
  }

  private loadIdentity(): UserIdentity {
    if (typeof window === "undefined") {
      return {
        id: null,
        type: "anonymous",
        anonymousId: this.generateAnonymousId(),
      };
    }

    const stored = localStorage.getItem("nns_identity");
    if (stored) {
      return JSON.parse(stored);
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

    const stored = localStorage.getItem("nns_consent");
    if (stored) {
      return JSON.parse(stored);
    }

    return {
      marketing: true,
      analytics: true,
      updatedAt: Date.now(),
    };
  }

  private saveIdentity(): void {
    localStorage.setItem("nns_identity", JSON.stringify(this.identity));
  }

  private generateAnonymousId(): string {
    return `${this.config.anonymousIdPrefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
