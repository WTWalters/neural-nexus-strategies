// src/lib/api/case-studies.ts

import { env } from "@/config/env";

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;

  industry: string;
  client_name: string;
  challenge: string;
  solution: string;
  results: Record<string, string>; // More specific than 'any'
  implementation_timeline: string;
  testimonial?: string;
  excerpt?: string;
  featured_image: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  is_featured: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
}

export async function getCaseStudies({
  page = 1,
  industry,
  search,
  per_page = 9,
}: {
  page?: number;
  industry?: string;
  search?: string;
  per_page?: number;
} = {}): Promise<CaseStudy[]> {
  try {
    const params = new URLSearchParams();

    if (page > 1) params.append("page", page.toString());
    if (industry) params.append("industry", industry);
    if (search) params.append("search", search);
    params.append("per_page", per_page.toString());

    console.log("Fetching case studies with params:", params.toString());

    const baseUrl = new URL(
      "/api/content/case-studies/",
      env.NEXT_PUBLIC_API_URL,
    );
    if (params.toString()) {
      baseUrl.search = params.toString();
    }

    console.log("API URL:", baseUrl.toString());

    const response = await fetch(baseUrl.toString(), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch case studies");
    }

    const data = await response.json();
    console.log("Fetched case studies:", data);
    return data.results || data;
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

export async function getCaseStudy(slug: string) {
  try {
    const baseUrl = new URL(
      `/api/content/case-studies/${slug}/`,
      env.NEXT_PUBLIC_API_URL,
    );
    console.log("Fetching case study from:", baseUrl.toString());

    const response = await fetch(baseUrl.toString(), {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response status text:", response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to fetch case study: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Case study data:", data);

    if (!data) {
      console.error("No data returned from API");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}
