// src/components/marketing/case-studies/case-study-pagination.tsx
// Path: neural_nexus_frontend/src/components/marketing/case-studies/case-study-pagination.tsx
import React, { Fragment } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  industry?: string;
  search?: string;
}

export function CaseStudyPagination({
  currentPage,
  totalPages,
  industry,
  search,
}: PaginationProps) {
  const createQueryString = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (industry) params.set("industry", industry);
    if (search) params.set("search", search);
    return params.toString();
  };

  return (
    <nav
      className="flex justify-center items-center gap-2 py-8"
      aria-label="Case studies pagination"
    >
      {/* Previous Page */}
      {currentPage > 1 && (
        <Link href={`/case-studies?${createQueryString(currentPage - 1)}`}>
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
          )
          .map((p, index, array) => (
            <Fragment key={p}>
              {index > 0 && array[index - 1] !== p - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <Link href={`/case-studies?${createQueryString(p)}`}>
                <Button
                  variant={currentPage === p ? "default" : "outline"}
                  aria-current={currentPage === p ? "page" : undefined}
                >
                  {p}
                </Button>
              </Link>
            </Fragment>
          ))}
      </div>

      {/* Next Page */}
      {currentPage < totalPages && (
        <Link href={`/case-studies?${createQueryString(currentPage + 1)}`}>
          <Button variant="outline" className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </nav>
  );
}
