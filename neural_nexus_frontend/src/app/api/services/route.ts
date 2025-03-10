import { NextResponse } from 'next/server';

export async function GET() {
  // Sample services data
  const services = [
    {
      id: 1,
      category: 1,
      name: "Data Strategy Workshop",
      slug: "data-strategy-workshop",
      package_type: "ESSENTIALS",
      description: "Develop a comprehensive data strategy aligned with your business objectives.",
      duration: "2 weeks",
      is_active: true,
      features: [
        {
          id: 1,
          name: "Data maturity assessment",
          description: "Evaluate your organization's current data capabilities",
          is_highlighted: true,
          order: 1
        },
        {
          id: 2,
          name: "Strategic roadmap development",
          description: "Create a phased plan for data initiatives",
          is_highlighted: true,
          order: 2
        }
      ],
      deliverables: [
        {
          id: 1,
          name: "Data Strategy Document",
          description: "Comprehensive strategy with initiatives prioritized by impact",
          timeline: "2 weeks",
          order: 1
        }
      ]
    },
    {
      id: 2,
      category: 1,
      name: "Fractional CDO",
      slug: "fractional-cdo",
      package_type: "PROFESSIONAL",
      description: "Get executive-level data leadership on a part-time basis.",
      duration: "3 months",
      is_active: true,
      features: [
        {
          id: 3,
          name: "Executive data leadership",
          description: "Strategic guidance and leadership for data initiatives",
          is_highlighted: true,
          order: 1
        },
        {
          id: 4,
          name: "Data governance implementation",
          description: "Establish policies, standards, and processes",
          is_highlighted: true,
          order: 2
        }
      ],
      deliverables: [
        {
          id: 2,
          name: "Monthly Progress Reports",
          description: "Status updates on data initiatives",
          timeline: "Monthly",
          order: 1
        }
      ]
    },
    {
      id: 3,
      category: 2,
      name: "AI Data Accelerator",
      slug: "accelerator",
      package_type: "ENTERPRISE",
      description: "Comprehensive framework to assess and improve your organization's AI readiness.",
      duration: "12 weeks",
      is_active: true,
      features: [
        {
          id: 5,
          name: "AI Readiness Assessment",
          description: "Evaluate your data foundation for AI implementation",
          is_highlighted: true,
          order: 1
        },
        {
          id: 6,
          name: "Implementation Roadmap",
          description: "Prioritized action plan for AI readiness",
          is_highlighted: true,
          order: 2
        }
      ],
      deliverables: [
        {
          id: 3,
          name: "AI Readiness Report",
          description: "Comprehensive analysis of your AI readiness",
          timeline: "2 weeks",
          order: 1
        },
        {
          id: 4,
          name: "90-Day Implementation Plan",
          description: "Step-by-step guide for improving AI capabilities",
          timeline: "4 weeks",
          order: 2
        }
      ]
    }
  ];
  
  return NextResponse.json({
    count: services.length,
    next: null,
    previous: null,
    results: services
  });
}
