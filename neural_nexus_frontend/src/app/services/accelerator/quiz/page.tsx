"use client";
import { Suspense, useState } from "react";
import { submitQuiz } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

const ServiceBreadcrumb = dynamic(
  () =>
    import("@/components/marketing/services/service-breadcrumb").then(
      (mod) => mod.ServiceBreadcrumb,
    ),
  { ssr: false },
);

interface QuizAnswers {
  [dimension: string]: number[];
}

const questions: { [key: string]: string[] } = {
  "Data Trust Engine": [
    "How would you rate your data quality management?",
    "How standardized are your data definitions?",
    "How accessible is your data across the organization?",
  ],
  "Data Rulebook": [
    "How robust are your data governance protocols?",
    "How strong are your data security measures?",
    "How regular are your compliance reviews?",
  ],
  "AI Power Grid": [
    "How mature is your AI infrastructure?",
    "How scalable are your AI systems?",
    "How efficient is your AI resource utilization?",
  ],
  "Data Flow Superhighway": [
    "How automated are your data pipelines?",
    "How real-time is your data processing?",
    "How integrated are your data systems?",
  ],
  "AI Fuel Factory": [
    "How clean is your training data?",
    "How diverse are your data sources?",
    "How well-labeled is your data?",
  ],
  "AI Mindset Shift": [
    "How AI-aware is your leadership?",
    "How data-driven is your culture?",
    "How strong is your change management?",
  ],
  "AI Deployment Machine": [
    "How automated is your AI deployment?",
    "How robust is your AI monitoring?",
    "How effective is your AI maintenance?",
  ],
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (dim: string, qIdx: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [dim]: [
        ...(prev[dim] || [0, 0, 0]).slice(0, qIdx),
        value,
        ...(prev[dim] || [0, 0, 0]).slice(qIdx + 1),
      ],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitQuiz({ email, answers });
      window.location.href = `/services/accelerator/results/${result.id}`;
    } catch (error) {
      console.error("Quiz submission failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to submit quiz",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div className="animate-pulse h-screen bg-gray-100" />}>
      <main className="container mx-auto px-4 py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <ServiceBreadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: "AI Readiness Quiz" },
          ]}
          className="mb-8"
        />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            AI Data Readiness Assessment
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Rate each aspect from 1 (Needs Improvement) to 5 (Excellent)
          </p>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email (optional)"
            className="mb-8 max-w-md mx-auto"
          />

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {Object.entries(questions).map(([dim, qs]) => (
            <div key={dim} className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dim}
              </h2>
              {qs.map((q, i) => (
                <div key={i} className="mb-6">
                  <p className="text-gray-700 mb-3">{q}</p>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        variant={
                          answers[dim]?.[i] === v ? "default" : "outline"
                        }
                        onClick={() => handleAnswer(dim, i, v)}
                        className="w-12 h-12"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            size="lg"
            className="mt-6 mx-auto block"
          >
            {loading ? "Analyzing Responses..." : "Get Your Results"}
          </Button>
        </div>
      </main>
    </Suspense>
  );
}
