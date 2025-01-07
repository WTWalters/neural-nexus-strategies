// Path: neural_nexus_frontend/src/lib/api/services.ts
import { env } from "@/config/env";

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  key_features?: string[];
}

export async function getServices(): Promise<Service[]> {
  // Note: Using /api/services/ instead of /api/content/services/
  const baseUrl = new URL("/api/services/", env.NEXT_PUBLIC_API_URL);
  console.log("Fetching services from:", baseUrl.toString());

  const response = await fetch(baseUrl.toString(), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch services: ${response.status} ${response.statusText}`,
    );
    throw new Error("Failed to fetch services");
  }

  return response.json();
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    // Note: Using /api/services/{slug}/ instead of /api/content/services/{slug}/
    const baseUrl = new URL(`/api/services/${slug}/`, env.NEXT_PUBLIC_API_URL);
    const response = await fetch(baseUrl.toString(), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch service: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}
