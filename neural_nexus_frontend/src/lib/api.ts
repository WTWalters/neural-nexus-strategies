// Path: neural_nexus_frontend/src/lib/api.ts
// src/lib/api.ts
import { endpoints } from "./config";

// Interfaces
interface QuizAnswers {
  [dimension: string]: number[];
}

interface QuizSubmission {
  email?: string;
  answers: QuizAnswers;
}

interface QuizResult {
  id: number;
  email?: string;
  total_score: number;
  dimension_scores: {
    dimension: string;
    score: number;
    answers: number[];
  }[];
  created_at: string;
}

interface ServiceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
}

interface Service {
  id: number;
  category: number;
  name: string;
  slug: string;
  package_type: "ESSENTIALS" | "PROFESSIONAL" | "ENTERPRISE";
  description: string;
  duration: string;
  is_active: boolean;
  features: Feature[];
  deliverables: Deliverable[];
}

interface Feature {
  id: number;
  name: string;
  description: string;
  is_highlighted: boolean;
  order: number;
}

interface Deliverable {
  id: number;
  name: string;
  description: string;
  timeline: string;
  order: number;
}

// API Error class
class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any,
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Enhanced fetchAPI function for local development
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Remove credentials for local development
    // credentials: "include",
    ...options,
  };

  try {
    console.log(`Fetching from endpoint: ${endpoint}`);
    const response = await fetch(endpoint, defaultOptions);

    if (!response.ok) {
      // Get more detailed error information
      const errorText = await response.text();
      console.error("API Error Details:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        endpoint,
      });

      throw new APIError(
        `API Error: ${response.status} - ${response.statusText}`,
        response.status,
        errorText,
      );
    }

    const data = await response.json();
    console.log(`Response from ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error("API fetch error:", {
      error,
      endpoint,
      options: defaultOptions,
    });

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(
      error instanceof Error ? error.message : "Unknown error occurred",
    );
  }
}

// Blog endpoints
export async function getBlogPosts(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoints.blog.posts}${queryString ? `?${queryString}` : ""}`;
  return fetchAPI(url);
}

export async function getCategories() {
  return fetchAPI(endpoints.blog.categories);
}

// Accelerator Quiz endpoints
export async function submitQuiz(data: QuizSubmission): Promise<QuizResult> {
  return fetchAPI(`${endpoints.accelerator.submit}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getQuizResults(quizId: number): Promise<QuizResult> {
  return fetchAPI(`${endpoints.accelerator.results}/${quizId}`);
}

// Service endpoints with better error handling
export async function getServices(params = {}): Promise<ServiceResponse> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoints.services.list}${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching services from:", url);

    const response = await fetchAPI(url);
    console.log("Raw services response:", response);

    // Handle both array and paginated responses
    if (Array.isArray(response)) {
      return {
        results: response,
        count: response.length,
        next: null,
        previous: null,
      };
    }

    // Handle paginated response
    if (response && typeof response === "object") {
      if (!response.results) {
        console.warn("Unexpected API response format:", response);
        // Try to adapt the response format
        return {
          results: [response].filter((item) => item.id), // Only include if it has an id
          count: 1,
          next: null,
          previous: null,
        };
      }
      return response;
    }

    throw new APIError("Invalid service response format");
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error instanceof APIError
      ? error
      : new APIError(
          `Failed to fetch services: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
  }
}

export async function getServiceCategories() {
  try {
    return await fetchAPI(endpoints.services.categories);
  } catch (error) {
    console.error("Error fetching service categories:", error);
    throw error instanceof APIError
      ? error
      : new APIError("Failed to fetch service categories");
  }
}

export async function getServiceMetadata() {
  try {
    return await fetchAPI(`${endpoints.services.list}metadata/`);
  } catch (error) {
    console.error("Error fetching service metadata:", error);
    throw error instanceof APIError
      ? error
      : new APIError("Failed to fetch service metadata");
  }
}

export async function getServicesByCategory() {
  try {
    return await fetchAPI(`${endpoints.services.list}by_category/`);
  } catch (error) {
    console.error("Error fetching services by category:", error);
    throw error instanceof APIError
      ? error
      : new APIError("Failed to fetch services by category");
  }
}

// Add a helper function to check API health
export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${endpoints.services.list}`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
}

// Export types for use in components
export type {
  QuizAnswers,
  QuizSubmission,
  QuizResult,
  Service,
  ServiceResponse,
  Feature,
  Deliverable,
  APIError,
};
