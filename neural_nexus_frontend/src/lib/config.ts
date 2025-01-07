// Path: neural_nexus_frontend/src/lib/config.ts

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nns-backend-production.up.railway.app/api";

export const endpoints = {
  blog: {
    posts: `${API_BASE_URL}/blog/posts/`,
    categories: `${API_BASE_URL}/blog/categories/`,
  },
  // Add other endpoints as needed
};
