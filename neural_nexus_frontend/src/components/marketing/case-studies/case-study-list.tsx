// src/components/marketing/case-studies/case-study-list.tsx
import { getCaseStudies } from "@/lib/api/case-studies";
import { CaseStudyCard } from "./case-study-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CaseStudyListProps {
  page: number;
  industry?: string;
  search?: string;
}

export async function CaseStudyList({
  page,
  industry,
  search,
}: CaseStudyListProps) {
  try {
    const caseStudies = await getCaseStudies({
      page,
      industry,
      search,
      per_page: 9,
    });

    if (caseStudies.length === 0) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No case studies found
          </h2>
          <p className="text-gray-600 mb-8">
            {search && `No case studies matching "${search}"`}
            {industry && !search && `No case studies in industry "${industry}"`}
            {!search && !industry && "No case studies available"}
          </p>
          <Button variant="outline" asChild>
            <Link href="/case-studies">View all case studies</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Search Results Header */}
        {search && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Search Results: "{search}"
            </h2>
            <p className="text-gray-600 mt-2">
              Found {caseStudies.length} case studies
            </p>
          </div>
        )}

        {/* Grid of Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              caseStudy={study}
              featured={index === 0 && page === 1 && !search && !industry}
            />
          ))}
        </div>

        {/* Pagination will be added here */}
      </div>
    );
  } catch (error) {
    console.error("Error in CaseStudyList:", error);
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load case studies</p>
      </div>
    );
  }
}
