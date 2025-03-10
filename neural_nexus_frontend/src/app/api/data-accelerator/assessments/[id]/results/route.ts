import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const assessmentId = params.id;
    
    // Sample results data
    const results = {
      id: parseInt(assessmentId),
      organization_name: "Sample Organization",
      assessment_type: "QUICK",
      overall_score: 3.2,
      maturity_level_name: "Intermediate",
      created_at: "2023-03-09T08:00:00Z",
      updated_at: "2023-03-09T09:00:00Z",
      dimension_scores: [
        {
          dimension_id: 1,
          dimension_name: "Data Trust Engine",
          dimension_icon: "🛡️",
          description: "Make your data bulletproof for AI.",
          score: 2.5,
          weight: 20,
          maturity_level: "Baseline"
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
          score: 3.5,
          weight: 15,
          maturity_level: "Intermediate"
        },
        {
          dimension_id: 4,
          dimension_name: "Data Flow Superhighway",
          dimension_icon: "🔄",
          description: "Get data where it needs to go, instantly.",
          score: 4.0,
          weight: 15,
          maturity_level: "Advanced"
        },
        {
          dimension_id: 5,
          dimension_name: "AI Fuel Factory",
          dimension_icon: "⛽",
          description: "Build the perfect fuel for AI models.",
          score: 2.8,
          weight: 15,
          maturity_level: "Intermediate"
        },
        {
          dimension_id: 6,
          dimension_name: "AI Mindset Shift",
          dimension_icon: "🧠",
          description: "Get your team ready to rock AI.",
          score: 3.2,
          weight: 10,
          maturity_level: "Intermediate"
        },
        {
          dimension_id: 7,
          dimension_name: "AI Deployment Machine",
          dimension_icon: "🚀",
          description: "Launch and maintain AI like a pro.",
          score: 3.7,
          weight: 10,
          maturity_level: "Intermediate"
        }
      ],
      recommendations: [
        {
          id: 1,
          dimension: 1,
          dimension_name: "Data Trust Engine",
          dimension_icon: "🛡️",
          text: "Implement basic data quality checks for critical datasets.",
          priority: 1,
          estimated_effort: "1-3 months",
          estimated_impact: "High"
        },
        {
          id: 2,
          dimension: 5,
          dimension_name: "AI Fuel Factory",
          dimension_icon: "⛽",
          text: "Establish basic processes for data labeling and annotation.",
          priority: 1,
          estimated_effort: "2-3 months",
          estimated_impact: "High"
        },
        {
          id: 3,
          dimension: 2,
          dimension_name: "Data Rulebook",
          dimension_icon: "📖",
          text: "Implement data classification and handling procedures.",
          priority: 2,
          estimated_effort: "3-4 months",
          estimated_impact: "Medium"
        },
        {
          id: 4,
          dimension: 6,
          dimension_name: "AI Mindset Shift",
          dimension_icon: "🧠",
          text: "Implement a data literacy program across the organization.",
          priority: 2,
          estimated_effort: "4-8 months",
          estimated_impact: "Medium"
        },
        {
          id: 5,
          dimension: 3,
          dimension_name: "AI Power Grid",
          dimension_icon: "⚡",
          text: "Establish infrastructure as code practices for reproducible AI environments.",
          priority: 3,
          estimated_effort: "2-4 months",
          estimated_impact: "Medium"
        }
      ]
    };
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
