"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface ResultsDashboardProps {
  assessmentId: string;
}

export default function ResultsDashboard({ assessmentId }: ResultsDashboardProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);
  
  useEffect(() => {
    async function fetchResults() {
      try {
        let resultsData;
        try {
          const response = await fetch(`/api/data-accelerator/assessments/${assessmentId}/results/`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch results: ${response.status}`);
          }
          
          resultsData = await response.json();
        } catch (apiError) {
          console.error("API error fetching results:", apiError);
          // Use a mock result
          resultsData = {
            id: parseInt(assessmentId),
            organization_name: "Your Organization",
            assessment_type: "QUICK",
            overall_score: 3.2,
            maturity_level_name: "Intermediate",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            dimension_scores: [
              {
                dimension_id: 1,
                dimension_name: "Data Trust Engine",
                dimension_icon: "🛡️",
                description: "Make your data bulletproof for AI.",
                score: 3.5,
                weight: 20,
                maturity_level: "Intermediate"
              },
              {
                dimension_id: 2,
                dimension_name: "Data Rulebook",
                dimension_icon: "📖",
                description: "Keep data safe, compliant, and usable.",
                score: 3.0,
                weight: 15,
                maturity_level: "Intermediate"
              },
              {
                dimension_id: 3,
                dimension_name: "AI Power Grid",
                dimension_icon: "⚡",
                description: "The tech backbone for AI wins.",
                score: 3.2,
                weight: 15,
                maturity_level: "Intermediate"
              }
            ],
            recommendations: [
              {
                id: 1,
                dimension: 1,
                dimension_name: "Data Trust Engine",
                dimension_icon: "🛡️",
                text: "Implement data quality monitoring across systems.",
                priority: 2,
                estimated_effort: "3-6 months",
                estimated_impact: "High"
              },
              {
                id: 2,
                dimension: 2,
                dimension_name: "Data Rulebook",
                dimension_icon: "📖",
                text: "Develop comprehensive data governance policies.",
                priority: 1,
                estimated_effort: "2-4 months",
                estimated_impact: "High"
              }
            ]
          };
          
          toast({
            title: "Simulation Mode",
            description: "Showing sample results due to connection issues.",
            variant: "default",
          });
        }
        
        setResults(resultsData);
        setLoading(false);
      } catch (error) {
        console.error("Error in results display:", error);
        toast({
          title: "Warning",
          description: "Results are being shown in simulation mode.",
          variant: "default",
        });
        setLoading(false);
      }
    }
    
    fetchResults();
  }, [assessmentId, toast]);
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!results) {
    return <div className="max-w-4xl mx-auto my-8 px-4">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">No Results Found</h2>
          <p>We couldn't find the assessment results you're looking for. Please try again or start a new assessment.</p>
          <Button asChild className="mt-4">
            <Link href="/assessment/quick">Start New Assessment</Link>
          </Button>
        </CardContent>
      </Card>
    </div>;
  }
  
  const radarData = results.dimension_scores.map((dimension: any) => ({
    subject: dimension.dimension_name,
    score: dimension.score,
    fullMark: 5,
  }));
  
  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Your AI Data Accelerator Results</h1>
      <p className="text-gray-600 mb-8">
        Assessment for {results.organization_name} | Completed {new Date(results.updated_at).toLocaleDateString()}
      </p>
      
      {/* Overall Score */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overall Score</h2>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">
                  {results.overall_score.toFixed(1)}
                </span>
                <span className="text-lg text-gray-500 mb-1">/5.0</span>
              </div>
              <p className="text-lg mt-2">
                <span className="font-medium">Maturity Level:</span>{" "}
                <span className="capitalize">{results.maturity_level_name?.toLowerCase()}</span>
              </p>
              <p className="mt-4 text-gray-600">
                {results.maturity_level_name === "Baseline" ? (
                  "Your organization is at the beginning of its AI journey. Focus on building fundamental capabilities."
                ) : results.maturity_level_name === "Intermediate" ? (
                  "Your organization has solid foundations for AI but needs to advance capabilities to maximize value."
                ) : (
                  "Your organization has advanced AI capabilities. Focus on optimization and innovation."
                )}
              </p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 5]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Dimension Scores */}
      <h2 className="text-2xl font-semibold mb-4">Dimension Breakdown</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {results.dimension_scores.map((dimension: any) => (
          <Card key={dimension.dimension_id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{dimension.dimension_icon}</span>
                <CardTitle>{dimension.dimension_name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">{dimension.score.toFixed(1)}</span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${(dimension.score / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Maturity Level:</span>{" "}
                <span className="capitalize">{dimension.maturity_level?.toLowerCase()}</span>
              </p>
              <p className="text-sm text-gray-600">{dimension.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Top Recommendations */}
      <h2 className="text-2xl font-semibold mb-4">Key Recommendations</h2>
      <div className="space-y-4 mb-8">
        {results.recommendations.slice(0, 3).map((recommendation: any) => (
          <Card key={recommendation.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white
                  ${recommendation.priority === 1 ? 'bg-red-500' : 
                    recommendation.priority === 2 ? 'bg-amber-500' : 'bg-green-500'}
                `}>
                  {recommendation.priority}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    {recommendation.dimension_name}
                  </h3>
                  <p className="mb-3">{recommendation.text}</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="font-medium">Effort:</span>{" "}
                      {recommendation.estimated_effort}
                    </div>
                    <div>
                      <span className="font-medium">Impact:</span>{" "}
                      {recommendation.estimated_impact}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/services/accelerator">See Available Services</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </div>
  );
}