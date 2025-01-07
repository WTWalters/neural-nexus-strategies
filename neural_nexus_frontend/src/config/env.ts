// Path: neural_nexus_frontend/src/config/env.ts
// Debug logging for environment configuration
console.log("[ENV Config] Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  IS_SERVER: typeof window === "undefined",
});

// Helper function to determine API URL
const determineApiUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  const isDevelopment = process.env.NODE_ENV === "development";
  const defaultUrl = isDevelopment
    ? "http://localhost:8000"
    : "https://nns-backend-production.up.railway.app";

  const finalUrl = configuredUrl || defaultUrl;

  console.log("[ENV Config] API URL Configuration:", {
    configuredUrl,
    isDevelopment,
    defaultUrl,
    finalUrl,
  });

  return finalUrl;
};

export const env = {
  NEXT_PUBLIC_API_URL: determineApiUrl(),
} as const;

// Log final configuration
console.log("[ENV Config] Final configuration:", env);

// Add type safety
export type Env = typeof env;

// Validate configuration
if (!env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "API URL is not configured. Please check your environment variables.",
  );
}

// Export validation helper
export const validateEnv = () => {
  if (!env.NEXT_PUBLIC_API_URL) {
    throw new Error("API URL is not configured");
  }
  return true;
};
