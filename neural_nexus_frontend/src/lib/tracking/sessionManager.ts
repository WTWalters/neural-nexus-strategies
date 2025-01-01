import { SessionData } from "./types";

export class SessionManager {
  private static readonly SESSION_KEY = "nns_session";
  private static readonly SESSION_TIMEOUT = 30; // minutes

  public static initSession(): SessionData {
    const existingSession = this.getSession();
    if (existingSession && this.isSessionValid(existingSession)) {
      return this.updateSession(existingSession);
    }

    return this.createNewSession();
  }

  public static updateSession(session: SessionData): SessionData {
    const updatedSession = {
      ...session,
      lastActivity: Date.now(),
      pageViews: session.pageViews + 1,
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(updatedSession));
    return updatedSession;
  }

  private static createNewSession(): SessionData {
    const session: SessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 1,
      referrer: document.referrer,
      entryPath: window.location.pathname,
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return session;
  }

  private static getSession(): SessionData | null {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  private static isSessionValid(session: SessionData): boolean {
    const timeSinceLastActivity =
      (Date.now() - session.lastActivity) / 1000 / 60; // in minutes
    return timeSinceLastActivity < this.SESSION_TIMEOUT;
  }

  private static generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
}
