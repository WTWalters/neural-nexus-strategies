// Path: neural_nexus_frontend/src/components/services/ai-readiness/AIReadinessContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import AIROICalculator from "@/components/calculators/AIROICalculator";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const readinessDimensions = [
  {
    icon: "🎯",
    title: "Strategic Alignment",
    description: "Ensure AI initiatives support business objectives",
    checkpoints: [
      "Business goal alignment",
      "Use case prioritization",
      "ROI potential assessment",
      "Stakeholder buy-in",
    ],
  },
  {
    icon: "📊",
    title: "Data Readiness",
    description: "Evaluate your data infrastructure and quality",
    checkpoints: [
      "Data quality assessment",
      "Infrastructure evaluation",
      "Data governance",
      "Collection processes",
    ],
  },
  {
    icon: "👥",
    title: "Team Capabilities",
    description: "Assess and develop AI implementation skills",
    checkpoints: [
      "Skills assessment",
      "Training needs",
      "Organizational structure",
      "Culture readiness",
    ],
  },
  {
    icon: "🔧",
    title: "Technical Infrastructure",
    description: "Review your technical foundation for AI",
    checkpoints: [
      "Systems assessment",
      "Integration capabilities",
      "Security readiness",
      "Scalability evaluation",
    ],
  },
  {
    icon: "📈",
    title: "Process Maturity",
    description: "Evaluate operational readiness for AI",
    checkpoints: [
      "Process documentation",
      "Automation potential",
      "Change management",
      "Quality controls",
    ],
  },
  {
    icon: "⚖️",
    title: "Governance & Ethics",
    description: "Ensure responsible AI implementation",
    checkpoints: [
      "Ethical framework",
      "Risk assessment",
      "Compliance review",
      "Monitoring systems",
    ],
  },
];

const roadmapSteps = [
  {
    title: "Assessment",
    description:
      "Comprehensive evaluation of your organization's AI readiness across all critical dimensions.",
    deliverables: [
      "Readiness scorecard",
      "Gap analysis",
      "Risk assessment",
      "Opportunity mapping",
    ],
  },
  {
    title: "Planning",
    description:
      "Develop a detailed implementation strategy and roadmap based on assessment findings.",
    deliverables: [
      "Implementation roadmap",
      "Resource planning",
      "Budget estimation",
      "Timeline development",
    ],
  },
  {
    title: "Foundation",
    description:
      "Build the necessary foundation for successful AI implementation.",
    deliverables: [
      "Data infrastructure",
      "Team training",
      "Process optimization",
      "Governance framework",
    ],
  },
  {
    title: "Implementation",
    description: "Execute AI initiatives with careful monitoring and support.",
    deliverables: [
      "Pilot projects",
      "Scale planning",
      "Success metrics",
      "Performance monitoring",
    ],
  },
];

const programs = [
  {
    name: "Readiness Assessment",
    price: "$10,000",
    duration: "2 weeks",
    description:
      "Evaluate your organization's AI readiness and identify opportunities",
    features: [
      "AI capability assessment",
      "Use case identification",
      "Technical review",
      "Basic roadmap",
      "Executive summary",
    ],
    featured: false,
  },
  {
    name: "Implementation Planning",
    price: "$35,000",
    duration: "4 weeks",
    description:
      "Comprehensive assessment and detailed implementation planning",
    features: [
      "Everything in Assessment",
      "Detailed use case analysis",
      "Technical requirements",
      "Data readiness review",
      "Implementation roadmap",
      "ROI analysis",
      "Team workshop",
    ],
    featured: true,
  },
  {
    name: "Full Launch Program",
    price: "$75,000",
    duration: "8 weeks",
    description: "End-to-end support from assessment through implementation",
    features: [
      "Everything in Planning",
      "Vendor selection support",
      "Pilot project design",
      "Team training program",
      "Change management plan",
      "60-day launch support",
      "Success monitoring",
    ],
    featured: false,
  },
];

export default function AIReadinessContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-success-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-success-100 text-success-700 rounded-full text-sm font-medium mb-6">
              AI Readiness Assessment & Implementation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prepare Your Organization for
              <span className="text-success-600"> AI Success</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Navigate your AI journey with confidence. From readiness
              assessment to implementation, we ensure your organization is
              prepared for successful AI adoption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BookDiscoveryButton size="lg" variant="default" />
              <Button variant="outline" size="lg" asChild>
                <Link href="#packages">View Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
      {/* Readiness Dimensions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Comprehensive AI Readiness Assessment
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our assessment framework evaluates your organization across six
            critical dimensions to ensure successful AI implementation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {readinessDimensions.map((dimension, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{dimension.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {dimension.title}
                </h3>
                <p className="text-gray-600 mb-4">{dimension.description}</p>
                <ul className="space-y-2">
                  {dimension.checkpoints.map((checkpoint, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                      <span className="text-gray-600">{checkpoint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Path to AI Success
          </h2>
          <div className="max-w-5xl mx-auto">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0"
              >
                <div className="md:w-1/3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center text-success-600 font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {step.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckIcon className="w-5 h-5 text-success-600 mr-2" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="packages" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            AI Readiness Programs
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`
                  rounded-lg p-8
                  flex flex-col
                  h-full
                  ${program.featured ? "border-2 border-success-600 shadow-lg" : "border border-gray-200"}
                `}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {program.name}
                  </h3>
                  <div className="text-3xl font-bold text-success-600 mb-2">
                    {program.price}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {program.duration}
                  </p>
                  <p className="text-gray-600">{program.description}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <BookDiscoveryButton
                    size="lg"
                    variant="default"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Calculate Your AI ROI
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Use our calculator to estimate the potential return on investment
            for your AI initiatives.
          </p>
          <AIROICalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-success-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your AI Journey Today
          </h2>
          <p className="text-xl text-success-100 mb-8 max-w-2xl mx-auto">
            Get a comprehensive assessment of your organization's AI readiness
            and a clear roadmap for successful implementation.
          </p>
          <BookDiscoveryButton
            size="lg"
            variant="outline"
            className="bg-background text-success-600 hover:bg-background/90"
          />
        </div>
      </section>
    </div>
  );
}
