// src/app/(marketing)/case-studies/[slug]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CaseStudyNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
      <p className="text-gray-600 mb-8">
        The case study you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/case-studies">Return to Case Studies</Link>
      </Button>
    </div>
  );
}
