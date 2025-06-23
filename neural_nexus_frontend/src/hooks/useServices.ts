import { useState, useEffect } from "react";
import { fetchServices, Service as BaseService } from "@/lib/api";

interface Service extends BaseService {
  id: number;
  category: number;
  name: string;
  slug: string;
  package_type: string;
  description: string;
  base_price: string;
  duration: string;
  is_active: boolean;
  features: Array<{
    id: number;
    name: string;
    description: string;
    is_highlighted: boolean;
    order: number;
  }>;
  deliverables: Array<{
    id: number;
    name: string;
    description: string;
    timeline: string;
    order: number;
  }>;
}

interface ServiceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
}

interface UseServicesReturn {
  services: Service[];
  isLoading: boolean;
  error: string | null;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      const response = await fetchServices();
      
      if (response.success && response.data) {
        setServices(response.data as Service[]);
      } else {
        setError(response.error?.message || "Failed to load services");
        setServices([]);
      }
      
      setIsLoading(false);
    };

    loadServices();
  }, []);

  return { services, isLoading, error };
}