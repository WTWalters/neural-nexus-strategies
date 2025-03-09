"use client";
import { Suspense, useEffect, useState } from "react";
import { getQuizResults } from "@/lib/api";
import { Radar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface QuizResult {
  id: number;
  email: string;
  total_score: number;
  dimension_scores: { dimension: string; score: number; answers: number[] }[];
}

export default function ResultsPage({
  params,
}: {
  params: { quizId: string };
}) {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuizResults(Number(params.quizId))
      .then(setResult)
      .catch((err) => {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load results");
      });
  }, [params.quizId]);

  if (error)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-red-500 text-xl">Error: {error}</h1>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/services/accelerator/quiz">Take Quiz Again</Link>
        </Button>
      </div>
    );

  if (!result)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse h-64 bg-gray-100 rounded-lg mb-4" />
        <p className="text-gray-600">Loading your results...</p>
      </div>
    );

  const chartData = {
    labels: result.dimension_scores.map((d) => d.dimension),
    datasets: [
      {
        label: "Readiness Score",
        data: result.dimension_scores.map((d) => d.score),
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#007bff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Suspense fallback={<div className="animate-pulse h-screen bg-gray-100" />}>
      <main className="container mx-auto px-4 py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Your AI Readiness Score: {result.total_score.toFixed(1)}
        </h1>
        <div className="max-w-2xl mx-auto">
          <Radar
            data={chartData}
            options={{
              scales: { r: { min: 0, max: 5 } },
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `Score: ${context.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
        <Button
          variant="default"
          size="lg"
          asChild
          className="mt-8 mx-auto block"
        >
          <Link href="/services">Explore Solutions</Link>
        </Button>
      </main>
    </Suspense>
  );
}
