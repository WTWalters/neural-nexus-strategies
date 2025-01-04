// src/lib/tracking/deviceFingerprint.ts
import { DeviceInfo } from "./types";

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[]; // Add dataLayer type
  }
}

export class DeviceFingerprint {
  private static instance: DeviceFingerprint;
  private fp: Promise<any>;
  private cachedDeviceId: string | null = null;

  private constructor() {
    this.fp = this.loadFingerprint();
  }

  private async loadFingerprint() {
    if (typeof window !== "undefined") {
      const FingerprintJS = (await import("@fingerprintjs/fingerprintjs"))
        .default;
      return FingerprintJS.load();
    }
    return null;
  }

  public static getInstance(): DeviceFingerprint {
    if (!DeviceFingerprint.instance) {
      DeviceFingerprint.instance = new DeviceFingerprint();
    }
    return DeviceFingerprint.instance;
  }

  public async getDeviceInfo(): Promise<DeviceInfo> {
    if (!this.fp) return this.getFallbackDeviceInfo();

    try {
      const fp = await this.fp;
      if (!fp) return this.getFallbackDeviceInfo();

      const result = await fp.get();

      if (!this.cachedDeviceId) {
        this.cachedDeviceId = result.visitorId;
      }

      return {
        deviceId: this.cachedDeviceId ?? "unknown", // Add null check with fallback
        userAgent:
          typeof window !== "undefined" ? window.navigator.userAgent : "",
        screenResolution:
          typeof window !== "undefined"
            ? `${window.screen.width}x${window.screen.height}`
            : "",
        language:
          typeof window !== "undefined" ? window.navigator.language : "",
        timezone:
          typeof window !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "",
        platform:
          typeof window !== "undefined" ? window.navigator.platform : "",
      };
    } catch (error) {
      console.error("Error getting device info:", error);
      return this.getFallbackDeviceInfo();
    }
  }

  private getFallbackDeviceInfo(): DeviceInfo {
    return {
      deviceId: "unknown",
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "",
      screenResolution:
        typeof window !== "undefined"
          ? `${window.screen.width}x${window.screen.height}`
          : "",
      language: typeof window !== "undefined" ? window.navigator.language : "",
      timezone:
        typeof window !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "",
      platform: typeof window !== "undefined" ? window.navigator.platform : "",
    };
  }

  public async getDeviceId(): Promise<string> {
    if (this.cachedDeviceId) {
      return this.cachedDeviceId;
    }

    const deviceInfo = await this.getDeviceInfo();
    return deviceInfo.deviceId;
  }
}
