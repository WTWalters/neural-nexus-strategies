// src/app/(marketing)/case-studies/page.tsx
import { CaseStudyErrorBoundary } from "@/components/marketing/case-studies/case-study-error-boundary";
import { CaseStudyAnalytics } from "@/components/marketing/case-studies/case-study-analytics";
import { getCaseStudies } from "@/lib/api/case-studies";
import { CaseStudyList } from "@/components/marketing/case-studies/case-study-list";
import { CaseStudySearch } from "@/components/marketing/case-studies/case-study-search";
import { notFound } from "next/navigation";

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

          <CaseStudyList
            page={parseInt(page)}
            industry={industry}
            search={search}
          />
        </div>
      </CaseStudyErrorBoundary>
    );
  } catch (error) {
    console.error("Error in CaseStudiesPage:", error);
    notFound();
  }
}
