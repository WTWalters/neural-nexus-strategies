// src/lib/api/case-studies.ts

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
  const params = new URLSearchParams();

  console.log("getCaseStudies called with:", {
    page,
    industry,
    search,
    per_page,
  });

  if (page > 1) params.append("page", page.toString());
  if (industry) params.append("industry", industry);
  if (search) params.append("search", search);
  params.append("per_page", per_page.toString());

  console.log("Fetching case studies with params:", params.toString());

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/case-studies/${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  console.log("API URL:", url);

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch case studies");
  }

  const data = await response.json();
  console.log("Fetched case studies:", data);
  return data.results || data;
}

export async function getCaseStudy(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/case-studies/${slug}/`; // Added trailing slash
    console.log("Fetching case study from:", url);

    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response status text:", response.statusText);

    // Try to get the error message from the response
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
