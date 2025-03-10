"use client";

import AssessmentWizard from "@/components/assessment/AssessmentWizard";

export default function QuickAssessmentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">AI Data Accelerator Quick Diagnostic</h1>
      <AssessmentWizard assessmentType="QUICK" />
    </div>
  );
}
