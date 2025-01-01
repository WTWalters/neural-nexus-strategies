export type UserType = "anonymous" | "known";

export interface UserIdentity {
  id: string | null;
  type: UserType;
  email?: string;
  primaryEmail?: string;
  anonymousId?: string;
  deviceId?: string;
  sessionId?: string;
}

export interface TrackingEvent {
  eventName: string;
  timestamp: number;
  identity: UserIdentity;
  properties: Record<string, any>;
  source: string;
  path: string;
}

export interface SessionData {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  referrer?: string;
  entryPath: string;
}

export interface DeviceInfo {
  deviceId: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  platform: string;
}

export interface ConsentSettings {
  marketing: boolean;
  analytics: boolean;
  updatedAt: number;
}

export interface TrackingConfig {
  sessionTimeout: number; // in minutes
  anonymousIdPrefix: string;
  apiEndpoint: string;
  googleAnalyticsId?: string;
}
