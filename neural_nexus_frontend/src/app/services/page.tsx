
// Path: neural_nexus_frontend/src/app/services/page.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ServicesFallback from "@/components/services/ServicesFallback";

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

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={<div className="h-8 bg-gray-100 rounded animate-pulse" />}
        >
          <ServiceBreadcrumb
            items={[{ label: "Services", href: "/services" }]}
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

        {/* Use the fallback component that tries multiple endpoints */}
        <ServicesFallback />

        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">AI Data Accelerator Assessment</h2>
            <p className="mb-6 text-blue-700">
              Take our free 5-minute assessment to evaluate your organization's AI readiness across 7 critical dimensions
              and receive a personalized AI acceleration roadmap.
            </p>
            <a href="/assessment/quick" className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition inline-block">Start Your Assessment</a>
          </div>
        </div>
      </div>
    </main>
  );
}
