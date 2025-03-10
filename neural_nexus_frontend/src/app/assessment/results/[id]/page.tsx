"use client";

import { useParams } from "next/navigation";
import ResultsDashboard from "@/components/assessment/ResultsDashboard";

export default function AssessmentResultsPage() {
  const params = useParams();
  const assessmentId = params.id as string;

  return (
    <div className="container mx-auto px-4 py-12">
      <ResultsDashboard assessmentId={assessmentId} />
    </div>
  );
}
