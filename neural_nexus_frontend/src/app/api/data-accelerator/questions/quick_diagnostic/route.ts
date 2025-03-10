import { NextResponse } from 'next/server';

export async function GET() {
  // Sample quick diagnostic questions (filtered from all questions)
  const diagnosticQuestions = [
    {
      id: 1,
      text: "How would you rate the overall quality and accuracy of your data?",
      help_text: "Consider factors like completeness, consistency, and correctness.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 1,
        name: "data_trust_engine",
        display_name: "Data Trust Engine",
        icon: "🛡️"
      }
    },
    {
      id: 3,
      text: "How robust are your data security controls and practices?",
      help_text: "Consider access controls, encryption, and other security measures.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 2,
        name: "data_rulebook",
        display_name: "Data Rulebook",
        icon: "📖"
      }
    },
    {
      id: 5,
      text: "How would you rate your technical infrastructure's ability to support AI workloads?",
      help_text: "Consider computing power, storage, and scalability.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 3,
        name: "ai_power_grid",
        display_name: "AI Power Grid",
        icon: "⚡"
      }
    },
    {
      id: 7,
      text: "How would you rate the integration between your different data systems?",
      help_text: "Consider how well data flows between databases, applications, and departments.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 4,
        name: "data_flow_superhighway",
        display_name: "Data Flow Superhighway",
        icon: "🔄"
      }
    },
    {
      id: 9,
      text: "How mature are your organization's capabilities for preparing data specifically for AI?",
      help_text: "Consider feature engineering, data labeling, and AI-specific transformations.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 5,
        name: "ai_fuel_factory",
        display_name: "AI Fuel Factory",
        icon: "⛽"
      }
    },
    {
      id: 11,
      text: "How would you rate your organization's overall data literacy?",
      help_text: "Data literacy is the ability to read, work with, analyze, and communicate with data.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 6,
        name: "ai_mindset_shift",
        display_name: "AI Mindset Shift",
        icon: "🧠"
      }
    },
    {
      id: 13,
      text: "How mature are your processes for deploying AI models to production?",
      help_text: "Consider standardized deployment workflows and automation.",
      order: 1,
      is_quick_diagnostic: true,
      dimension: {
        id: 7,
        name: "ai_deployment_machine",
        display_name: "AI Deployment Machine",
        icon: "🚀"
      }
    }
  ];
  
  return NextResponse.json(diagnosticQuestions);
}
