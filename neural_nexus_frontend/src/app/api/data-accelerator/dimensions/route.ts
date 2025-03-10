import { NextResponse } from 'next/server';

export async function GET() {
  // Sample dimensions data
  const dimensions = [
    {
      id: 1,
      name: "data_trust_engine",
      display_name: "Data Trust Engine",
      slug: "data-trust-engine",
      short_description: "Make your data bulletproof for AI.",
      weight: 20,
      order: 1,
      icon: "🛡️"
    },
    {
      id: 2,
      name: "data_rulebook",
      display_name: "Data Rulebook",
      slug: "data-rulebook",
      short_description: "Keep data safe, compliant, and usable.",
      weight: 15,
      order: 2,
      icon: "📖"
    },
    {
      id: 3,
      name: "ai_power_grid",
      display_name: "AI Power Grid",
      slug: "ai-power-grid",
      short_description: "The tech backbone for AI wins.",
      weight: 15,
      order: 3,
      icon: "⚡"
    },
    {
      id: 4,
      name: "data_flow_superhighway",
      display_name: "Data Flow Superhighway",
      slug: "data-flow-superhighway",
      short_description: "Get data where it needs to go, instantly.",
      weight: 15,
      order: 4,
      icon: "🔄"
    },
    {
      id: 5,
      name: "ai_fuel_factory",
      display_name: "AI Fuel Factory",
      slug: "ai-fuel-factory",
      short_description: "Build the perfect fuel for AI models.",
      weight: 15,
      order: 5,
      icon: "⛽"
    },
    {
      id: 6,
      name: "ai_mindset_shift",
      display_name: "AI Mindset Shift",
      slug: "ai-mindset-shift",
      short_description: "Get your team ready to rock AI.",
      weight: 10,
      order: 6,
      icon: "🧠"
    },
    {
      id: 7,
      name: "ai_deployment_machine",
      display_name: "AI Deployment Machine",
      slug: "ai-deployment-machine",
      short_description: "Launch and maintain AI like a pro.",
      weight: 10,
      order: 7,
      icon: "🚀"
    }
  ];
  
  return NextResponse.json(dimensions);
}
