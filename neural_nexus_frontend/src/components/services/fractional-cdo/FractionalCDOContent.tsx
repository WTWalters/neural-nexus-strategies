// Path: neural_nexus_frontend/src/components/services/fractional-cdo/FractionalCDOContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";
import Link from "next/link";

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

const benefits = [
  {
    icon: <span className="text-2xl">💡</span>,
    title: "Executive Expertise",
    description:
      "Get C-level data leadership experience without the full-time executive cost.",
  },
  {
    icon: <span className="text-2xl">🚀</span>,
    title: "Strategic Guidance",
    description:
      "Develop and execute data strategies aligned with your business objectives.",
  },
  {
    icon: <span className="text-2xl">⚡</span>,
    title: "Flexible Engagement",
    description:
      "Scale services up or down based on your organization's needs.",
  },
];

const services = [
  {
    icon: <span className="text-2xl">📊</span>,
    title: "Strategic Planning",
    description:
      "Develop comprehensive data strategies aligned with business objectives.",
  },
  {
    icon: <span className="text-2xl">👥</span>,
    title: "Team Development",
    description: "Build and mentor high-performing data teams.",
  },
  {
    icon: <span className="text-2xl">🛠️</span>,
    title: "Technology Selection",
    description: "Evaluate and select the right tools and platforms.",
  },
  {
    icon: <span className="text-2xl">📈</span>,
    title: "Performance Metrics",
    description: "Define and track KPIs to measure data initiative success.",
  },
];

const pricingPlans = [
  {
    name: "Essentials",
    price: "5,000",
    description: "Perfect for growing companies starting their data journey",
    features: [
      "10 hours monthly strategic advisory",
      "Monthly data strategy review",
      "Quarterly roadmap updates",
      "Email support",
      "Basic KPI dashboard",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: "10,000",
    description: "Ideal for companies serious about data transformation",
    features: [
      "20 hours monthly strategic advisory",
      "Bi-weekly strategy sessions",
      "Monthly board meeting prep",
      "Priority support",
      "Advanced KPI tracking",
      "Team hiring support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "20,000",
    description: "For organizations where data is a critical strategic asset",
    features: [
      "40 hours monthly strategic advisory",
      "Weekly strategy sessions",
      "24/7 emergency support",
      "Custom analytics dashboards",
      "Full vendor management",
      "Crisis management support",
    ],
    featured: false,
  },
];

export default function FractionalCDOContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fractional Chief Data Officer Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enterprise-grade data leadership without the cost of a full-time
              executive. Get strategic guidance, implementation expertise, and
              ongoing support.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4 justify-center w-full">
              <BookDiscoveryButton size="lg" variant="default" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose a Fractional CDO?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`
                  rounded-lg p-8
                  flex flex-col
                  h-full
                  ${plan.featured ? "border-2 border-primary-600 shadow-lg" : "border border-gray-200"}
                `}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    ${plan.price}
                    <span className="text-base font-normal text-gray-600">
                      /month
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600"
                    >
                      <CheckIcon className="w-5 h-5 text-primary-600 mr-2" />
                      {feature}
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

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Data Strategy?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Schedule a discovery call to discuss how our Fractional CDO services
            can help your organization leverage data for strategic advantage.
          </p>
          <BookDiscoveryButton
            size="lg"
            variant="outline"
            className="bg-background text-primary-600 hover:bg-background/90"
          />
        </div>
      </section>
    </div>
  );
}
