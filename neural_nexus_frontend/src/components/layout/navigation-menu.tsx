// src/components/layout/navigation-menu.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { tracking } from "@/lib/tracking";
import { Alert } from "@/components/ui/alert";

interface Service {
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

// ... other imports
console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL); // Debug environment variable

export default function NavigationMenu() {
  console.log("NavigationMenu component starting");

  const pathname = usePathname();
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Debug renders - move this after state initialization
  React.useEffect(() => {
    console.log("NavigationMenu state:", {
      servicesCount: services?.length || 0,
      isLoading,
      error,
    });
  }, [services, isLoading, error]);

  React.useEffect(() => {
    console.log("NavigationMenu fetch useEffect running");

    const fetchServices = async () => {
      console.log("Starting fetchServices");
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/services/`;
        console.log("Fetching from URL:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("Response received:", {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw data received:", data);

        if (data && data.results && Array.isArray(data.results)) {
          console.log("Setting services with:", data.results.length, "items");
          setServices(data.results);
        } else {
          console.error("Invalid data structure:", data);
          throw new Error("Invalid data structure received");
        }
      } catch (err) {
        console.error("Error in fetchServices:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load services",
        );
        setServices([]);
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    };

    fetchServices().catch((err) => {
      console.error("Uncaught error in fetchServices:", err);
    });

    return () => {
      console.log("NavigationMenu fetch useEffect cleanup");
    };
  }, []);

  // Debug renders
  console.log("NavigationMenu render:", {
    servicesCount: services.length,
    isLoading,
    error,
  });

  // Add effect to log state changes
  React.useEffect(() => {
    console.log("Services state updated:", services);
  }, [services]);

  React.useEffect(() => {
    console.log("Loading state updated:", isLoading);
  }, [isLoading]);

  // Add debug render information
  console.log("Current services state:", services);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.List className="flex items-center gap-6">
        <NavigationMenuPrimitive.Item>
          <Link
            href="/services"
            className={cn(
              "group flex items-center gap-1 hover:text-primary-600",
              pathname === "/services" && "text-primary-600",
            )}
          >
            Services
            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
          </Link>
          <NavigationMenuPrimitive.Content className="absolute bg-white p-4 shadow-lg rounded-lg min-w-[240px]">
            {isLoading ? (
              <div className="p-4 text-center">Loading services...</div>
            ) : error ? (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            ) : services && services.length > 0 ? (
              <>
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="font-medium">{service.name}</div>
                    {service.description && (
                      <div className="text-sm text-gray-600 mt-1">
                        {service.description}
                      </div>
                    )}
                  </Link>
                ))}
                <div className="border-t mt-2 pt-2">
                  <Link
                    href="/services"
                    className="block p-3 text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-4 text-center">No services available</div>
            )}
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>
        {/* ... rest of your navigation items ... */}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}
