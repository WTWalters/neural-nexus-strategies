// src/app/services/[slug]/page.tsx
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, CheckCircle2, Calendar, Clock } from "lucide-react";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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

function getPackageTypeStyles(type: string) {
  switch (type) {
    case "ESSENTIALS":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "PROFESSIONAL":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "ENTERPRISE":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) throw new Error("API URL is not configured");
        if (!params?.slug) throw new Error("Service slug is required");

        const response = await fetch(`${apiUrl}/api/services/${params.slug}/`);
        if (!response.ok)
          throw new Error(`Service not found (Status: ${response.status})`);

        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      fetchServiceDetail();
    }
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "Service not found"}. Please try again later or contact
            support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <a
            href="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Services
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <div className="mb-4">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getPackageTypeStyles(service.package_type)}`}
                >
                  {service.package_type}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-gray-600">{service.description}</p>
            </div>
            <div className="lg:text-right">
              <div className="text-2xl font-semibold text-gray-900 mb-2">
                Contact for Pricing
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Duration: {service.duration}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Key Features
            </h2>
            <ul className="space-y-6">
              {service.features.map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <CheckCircle2
                    className={`w-6 h-6 mr-3 mt-1 ${feature.is_highlighted ? "text-green-500" : "text-blue-500"}`}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Deliverables
            </h2>
            <ul className="space-y-6">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable.id}>
                  <h3 className="font-semibold text-gray-900">
                    {deliverable.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {deliverable.description}
                  </p>
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    <Calendar className="w-4 h-4 mr-2" />
                    {deliverable.timeline}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's discuss how {service.name} can help you achieve your data and
            AI objectives.
          </p>
          <BookDiscoveryButton size="lg" variant="default" />
        </div>
      </div>
    </div>
  );
}
