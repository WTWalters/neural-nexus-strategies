// Path: neural_nexus_frontend/src/lib/api.ts

import { endpoints } from "./config";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      // Add any other default headers here
    },
    ...options,
  };

  try {
    const response = await fetch(endpoint, defaultOptions);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

export async function getBlogPosts(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoints.blog.posts}${queryString ? `?${queryString}` : ""}`;
  return fetchAPI(url);
}

export async function getCategories() {
  return fetchAPI(endpoints.blog.categories);
}
