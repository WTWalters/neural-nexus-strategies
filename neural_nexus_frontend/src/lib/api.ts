// Unified API utilities and error handling

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Standard API error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Standard API response wrapper
export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

// HTTP method types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request configuration
interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// Base API client
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  // Main request method
  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = "GET",
      headers = {},
      body,
      timeout = 10000,
    } = config;

    const url = `${this.baseUrl}${endpoint}`;
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data?.message || `HTTP ${response.status}: ${response.statusText}`,
            status: response.status,
            code: data?.code,
          },
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      let message = "Network error occurred";
      
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          message = "Request timed out";
        } else {
          message = error.message;
        }
      }

      return {
        success: false,
        error: {
          message,
        },
      };
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}

// Default API client instance
export const api = new ApiClient();

// Specific API endpoints
export const endpoints = {
  newsletter: {
    subscribe: "/api/leads/newsletter/subscribe/",
  },
  contact: {
    submit: "/api/leads/contact/",
  },
  services: "/api/services/",
} as const;

// Newsletter subscription
export interface NewsletterData {
  firstName: string;
  email: string;
  source: string;
}

export async function subscribeToNewsletter(data: NewsletterData): Promise<ApiResponse> {
  return api.post(endpoints.newsletter.subscribe, data);
}

// Contact form submission
export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export async function submitContactForm(data: ContactData): Promise<ApiResponse> {
  return api.post(endpoints.contact.submit, data);
}

// Services fetching (for navigation, etc.)
export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  // ... other service fields
}

export async function fetchServices(): Promise<ApiResponse<Service[]>> {
  const response = await api.get<{ results: Service[] }>(endpoints.services);
  
  if (response.success && response.data?.results) {
    return {
      success: true,
      data: response.data.results,
    };
  }
  
  return response;
}