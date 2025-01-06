// Path: neural_nexus_frontend/src/app/(marketing)/case-studies/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CaseStudyErrorBoundary } from "@/components/marketing/case-studies/case-study-error-boundary";
import { CaseStudyList } from "@/components/marketing/case-studies/case-study-list";
import { CaseStudySearch } from "@/components/marketing/case-studies/case-study-search";
import { CaseStudyAnalytics } from "@/components/marketing/case-studies/case-study-analytics";

export const fetchCache = "force-dynamic";

interface CaseStudiesPageProps {
  searchParams: {
    page?: string;
    industry?: string;
    search?: string;
  };
}

export default async function CaseStudiesPage({
  searchParams,
}: CaseStudiesPageProps) {
  const { page = "1", industry, search } = searchParams;

  try {
    return (
      <CaseStudyErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <CaseStudyAnalytics />

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Case Studies
            </h1>
            <p className="text-xl text-gray-600">
              Learn how we've helped organizations transform through data and AI
            </p>
          </header>

          <div className="mb-8">
            <CaseStudySearch />
          </div>

          <Suspense
            fallback={
              <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />
            }
          >
            <CaseStudyList
              page={parseInt(page)}
              industry={industry}
              search={search}
            />
          </Suspense>
        </div>
      </CaseStudyErrorBoundary>
    );
  } catch (error) {
    console.error("Error in CaseStudiesPage:", error);
    notFound();
  }
}
