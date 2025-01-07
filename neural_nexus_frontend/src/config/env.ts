// Path: neural_nexus_frontend/src/config/env.ts
export const env = {
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://nns-backend-production.up.railway.app",
};
