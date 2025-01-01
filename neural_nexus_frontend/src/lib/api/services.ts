// src/lib/api/services.ts
interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  key_features?: string[];
}

export async function getServices(): Promise<Service[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return response.json();
}
