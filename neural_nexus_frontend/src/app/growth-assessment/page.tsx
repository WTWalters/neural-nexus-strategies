// Path: neural_nexus_frontend/src/app/growth-assessment/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Growth Assessment | Neural Nexus Strategies",
  description:
    "Tell us about your business and we'll prepare customized recommendations to help you scale.",
};

export default function GrowthAssessmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Business Growth Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Take 15–20 minutes to tell us about your business. We&apos;ll
            review your responses within 24 hours and reach out to schedule a
            strategy call with customized recommendations.
          </p>
        </div>
      </section>

      {/* Embedded Google Form */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScrgqx7gEUnIRLGXVF40xzrWQ-Hb0yX0byL54-Vnix2lprIBA/viewform?embedded=true"
            width="100%"
            height="3200"
            className="border-0 w-full"
            title="Business Growth Assessment"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </div>
  );
}
