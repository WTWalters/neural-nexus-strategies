// Path: neural_nexus_frontend/src/components/services/data-strategy/DataStrategyContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";

// Move the CheckIcon component to the top level
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

// Define the data structure types
interface SolutionType {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface PackageType {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  featured: boolean;
}

// Separate the data
const solutions: SolutionType[] = [
  {
    icon: <span className="text-2xl">📊</span>,
    title: "Data Maturity Assessment",
    description:
      "Evaluate your current capabilities and identify opportunities",
    features: [
      "Technology stack evaluation",
      "Process assessment",
      "Team capabilities review",
      "Gap analysis",
    ],
  },
  {
    icon: <span className="text-2xl">🎯</span>,
    title: "Strategy Development",
    description: "Create a comprehensive data strategy aligned with your goals",
    features: [
      "Business alignment",
      "Technology roadmap",
      "Governance framework",
      "ROI modeling",
    ],
  },
  {
    icon: <span className="text-2xl">⚡</span>,
    title: "Implementation Support",
    description: "Hands-on guidance through execution",
    features: [
      "Project planning",
      "Vendor selection",
      "Team training",
      "Change management",
    ],
  },
];

const packages: PackageType[] = [
  {
    name: "Quick Start Assessment",
    price: "$15,000",
    duration: "2 weeks",
    description: "Perfect for organizations starting their data journey",
    features: [
      "Data maturity assessment",
      "Current state analysis",
      "Gap identification",
      "High-level recommendations",
      "Executive presentation",
    ],
    featured: false,
  },
  {
    name: "Strategic Roadmap",
    price: "$45,000",
    duration: "6 weeks",
    description:
      "Comprehensive strategy development and implementation planning",
    features: [
      "Everything in Quick Start",
      "Detailed future state design",
      "Implementation roadmap",
      "ROI analysis",
      "Executive workshop",
      "30-day follow-up support",
    ],
    featured: true,
  },
  {
    name: "Full Transformation",
    price: "$95,000",
    duration: "12 weeks",
    description: "Complete strategy and implementation support",
    features: [
      "Everything in Strategic Roadmap",
      "Change management strategy",
      "Team structure design",
      "Vendor evaluation",
      "90-day implementation support",
      "Custom training program",
    ],
    featured: false,
  },
];

// Create smaller, focused components
const SolutionCard = ({ solution }: { solution: SolutionType }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="w-12 h-12 bg-innovation-100 rounded-lg flex items-center justify-center mb-4">
      {solution.icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {solution.title}
    </h3>
    <p className="text-gray-600 mb-4">{solution.description}</p>
    <ul className="space-y-2">
      {solution.features.map((feature, idx) => (
        <li key={idx} className="flex items-start">
          <CheckIcon className="w-5 h-5 text-innovation-600 mr-2 mt-0.5" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PackageCard = ({ pkg }: { pkg: PackageType }) => (
  <div
    className={`
      rounded-lg p-8
      flex flex-col
      h-full
      ${pkg.featured ? "border-2 border-innovation-600 shadow-lg" : "border border-gray-200"}
    `}
  >
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
      <div className="text-3xl font-bold text-innovation-600 mb-2">
        {pkg.price}
      </div>
      <p className="text-sm text-gray-600 mb-4">{pkg.duration}</p>
      <p className="text-gray-600">{pkg.description}</p>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {pkg.features.map((feature, idx) => (
        <li key={idx} className="flex items-start">
          <CheckIcon className="w-5 h-5 text-innovation-600 mr-2 mt-0.5" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto">
      <BookDiscoveryButton size="lg" variant="default" className="w-full" />
    </div>
  </div>
);

export default function DataStrategyContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-innovation-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-innovation-100 text-innovation-700 rounded-full text-sm font-medium mb-6">
              Data Strategy Consulting
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build a Data Strategy That
              <span className="text-innovation-600"> Drives Results</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your organization with a comprehensive data strategy
              that aligns with your business objectives. From assessment to
              implementation, we guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BookDiscoveryButton size="lg" variant="default" />
              <Button variant="outline" size="lg" asChild>
                <Link href="#packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Package
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-innovation-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Build Your Data Strategy?
          </h2>
          <p className="text-xl text-innovation-100 mb-8 max-w-2xl mx-auto">
            Book a consultation to discuss how we can help you develop and
            implement a data strategy that drives real business value.
          </p>
          <BookDiscoveryButton
            size="lg"
            variant="default"
            className="bg-white text-innovation-600 hover:bg-innovation-50"
          />
        </div>
      </section>
    </div>
  );
}
