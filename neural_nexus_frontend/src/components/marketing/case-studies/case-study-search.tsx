// src/components/marketing/case-studies/case-study-search.tsx
// Path: neural_nexus_frontend/src/components/marketing/case-studies/case-study-search.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { trackCaseStudyEvent } from "./case-study-analytics";

const industries = [
  { value: "Healthcare", label: "Healthcare" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Financial Services", label: "Financial Services" },
];

export function CaseStudySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;
    const industry = formData.get("industry") as string;

    startTransition(() => {
      // Track the search event
      trackCaseStudyEvent({
        action: "search",
        category: "case_study",
        metadata: {
          search_term: searchTerm,
          industry,
        },
      });

      const params = new URLSearchParams(searchParams?.toString() ?? "");

      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }
      if (industry) {
        params.set("industry", industry);
      } else {
        params.delete("industry");
      }
      params.delete("page");

      router.push(`/case-studies?${params.toString()}`);
    });
  }; // Added missing closing brace here

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            name="search"
            type="search"
            placeholder="Search case studies..."
            defaultValue={searchParams?.get("search") ?? ""}
            className="pl-10"
            aria-label="Search case studies"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {isPending && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent" />
            </div>
          )}
        </div>
        <select
          name="industry"
          defaultValue={searchParams?.get("industry") ?? ""}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label="Filter by industry"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry.value} value={industry.value}>
              {industry.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
