// Path: neural_nexus_frontend/src/components/services/ServicesContent.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Dynamic import for the breadcrumb
const ServiceBreadcrumb = dynamic(
  () =>
    import("@/components/marketing/services/service-breadcrumb").then(
      (mod) => mod.ServiceBreadcrumb,
    ),
  {
    ssr: false,
    loading: () => <div className="h-8 bg-gray-100 rounded animate-pulse" />,
  },
);

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

interface ServiceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
}

export default function ServicesContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case "ESSENTIALS":
        return "bg-blue-100 text-blue-800";
      case "PROFESSIONAL":
        return "bg-purple-100 text-purple-800";
      case "ENTERPRISE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDuration = (duration: string) => {
    return duration.replace(/(\d+)\s*(week|weeks)/gi, "~$1 $2");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("Attempting to fetch from:", apiUrl);

        if (!apiUrl) {
          throw new Error("API URL is not configured");
        }

        // Use the local Next.js API route which handles the rewrites
        const response = await fetch(`/api/services/services/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        
        // Check if we received a paginated response (with 'results') or direct array
        const servicesList = data.results || data;
        setServices(servicesList);
        setLoading(false);
      } catch (err) {
        console.error("Error details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load services",
        );
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-xl">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-red-500">
          <p>Error loading services:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={<div className="h-8 bg-gray-100 rounded animate-pulse" />}
        >
          <ServiceBreadcrumb
            items={[{ label: "All Services" }]}
            className="mb-8"
          />
        </Suspense>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Transform your organization with our comprehensive data and AI
            solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {service.name}
                  </h2>
                  <span
                    className={`${getPackageTypeColor(
                      service.package_type,
                    )} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {service.package_type}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-gray-500">
                    Duration: {formatDuration(service.duration)}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="mb-6 flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature.id} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-primary mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable.id} className="text-gray-600">
                        <div className="font-medium">{deliverable.name}</div>
                        <div className="text-sm text-gray-500">
                          Timeline: {formatDuration(deliverable.timeline)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
