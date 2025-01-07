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
  const baseUrl = new URL("/api/services/", env.NEXT_PUBLIC_API_URL);
  console.log("Fetching services from:", baseUrl.toString());

  try {
    const response = await fetch(baseUrl.toString(), {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch services: ${response.status} ${response.statusText}`,
      );
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
