// Path: neural_nexus_frontend/src/app/page.tsx
import type { Metadata } from "next";
import { SchemaScripts } from "@/components/seo/schema-scripts";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { HeroSection, BackgroundLayer, ContentSections } from "@/components/pages/home";

export const metadata: Metadata = {
  title: "Neural Nexus Strategies | Expert Data Leadership & AI Innovation",
  description:
    "Transform your organization with strategic data leadership and AI innovation. Expert Fractional CDO services, data strategy consulting, and AI implementation guidance.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuralnexusstrategies.ai",
    siteName: "Neural Nexus Strategies",
    title: "Expert Data Leadership & AI Innovation | Neural Nexus Strategies",
    description:
      "Transform your organization with strategic data leadership. Fractional CDO services, data strategy, and AI implementation for forward-thinking enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Data Leadership & AI Innovation",
    description:
      "Transform your organization with strategic data leadership and AI innovation.",
  },
  alternates: {
    canonical: "https://neuralnexusstrategies.ai",
  },
};

// Force dynamic rendering for fresh content
export const fetchCache = "force-dynamic";

export default function Home() {
  return (
    <>
      <SchemaScripts
        schemas={[
          { id: "schema-organization", data: organizationSchema },
          { id: "schema-website", data: websiteSchema },
        ]}
      />
      <main className="min-h-screen relative bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <BackgroundLayer />
        <div className="relative z-10">
          <HeroSection />
          <ContentSections />
        </div>
      </main>
    </>
  );
}
