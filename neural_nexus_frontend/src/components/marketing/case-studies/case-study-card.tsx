// src/components/marketing/case-studies/case-study-card.tsx
"use client";

import Link from "next/link";
import { CaseStudy } from "@/lib/api/case-studies";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { trackCaseStudyEvent } from "./case-study-analytics";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  featured?: boolean;
}

export function CaseStudyCard({
  caseStudy,
  featured = false,
}: CaseStudyCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const handleClick = () => {
    trackCaseStudyEvent({
      action: "click",
      label: caseStudy.title,
      properties: {
        category: "case_study",
        id: caseStudy.id,
        industry: caseStudy.industry,
        featured,
      },
    });
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow",
        featured && "md:col-span-2 lg:col-span-3",
      )}
    >
      {/* Image Section */}
      {caseStudy.featured_image && !hasImageError && (
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="relative aspect-video overflow-hidden"
          onClick={handleClick}
        >
          <img
            src={caseStudy.featured_image}
            alt={caseStudy.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            onError={() => setHasImageError(true)}
          />
        </Link>
      )}

      {/* Content Section */}
      <div className="flex flex-col p-6">
        {/* Industry & Client */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="text-primary-600 font-medium">
            {caseStudy.industry}
          </span>
          <span className="mx-2">•</span>
          <span>{caseStudy.client_name}</span>
        </div>

        {/* Title */}
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="group"
          onClick={handleClick}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {caseStudy.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {caseStudy.excerpt || caseStudy.challenge.split("\n")[0]}
        </p>

        {/* Results Preview */}
        {featured && caseStudy.results && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(caseStudy.results)
              .slice(0, 4)
              .map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">{key}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
          </div>
        )}

        {/* Footer / Call to Action */}
        <div className="mt-auto pt-4">
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            onClick={handleClick}
          >
            View Case Study
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
