// Path: neural_nexus_frontend/src/lib/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nns-backend-production.up.railway.app/api";

export const endpoints = {
  blog: {
    posts: `${API_BASE_URL}/content/posts/`,
    categories: `${API_BASE_URL}/content/categories/`,
  },
  accelerator: {
    submit: `${API_BASE_URL}/content/submit-quiz/`,
    results: `${API_BASE_URL}/content/results/`,
  },
  services: {
    // Try with multiple endpoint options to find what works
    list: `${API_BASE_URL}/services/`,
    listAlt1: `${API_BASE_URL}/services/services/`,
    listAlt2: `${API_BASE_URL}/api/services/`,
    listAlt3: `${API_BASE_URL}/api/services/services/`,
    categories: `${API_BASE_URL}/services/categories/`,
    metadata: `${API_BASE_URL}/services/services/metadata/`,
    byCategory: `${API_BASE_URL}/services/services/by_category/`,
  },
};

// Optional: Add type definitions for better TypeScript support
export type Endpoints = typeof endpoints;
export type BlogEndpoints = typeof endpoints.blog;
export type AcceleratorEndpoints = typeof endpoints.accelerator;
export type ServiceEndpoints = typeof endpoints.services;
