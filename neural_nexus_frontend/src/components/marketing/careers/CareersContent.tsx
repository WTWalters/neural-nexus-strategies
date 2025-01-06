// Path: neural_nexus_frontend/src/components/marketing/careers/CareersContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Send, Briefcase, Heart, Users, Sparkles, Gem } from "lucide-react";

interface ScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ScrollLink = ({ href, children, className }: ScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const benefits = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Health & Wellness",
    description:
      "Comprehensive health benefits and wellness programs to keep you at your best.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Growth & Development",
    description:
      "Continuous learning opportunities and career development pathways.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Flexible Work",
    description:
      "Remote-first culture with flexible hours and work-life balance.",
  },
  {
    icon: <Gem className="h-6 w-6" />,
    title: "Competitive Package",
    description:
      "Attractive compensation with equity options and performance bonuses.",
  },
];

const openPositions = [
  {
    id: 1,
    title: "Senior Data Scientist",
    department: "Data Science",
    location: "Remote",
    type: "Full-time",
    link: "/careers/senior-data-scientist",
  },
  {
    id: 2,
    title: "Data Strategy Consultant",
    department: "Consulting",
    location: "Remote",
    type: "Full-time",
    link: "/careers/data-strategy-consultant",
  },
  {
    id: 3,
    title: "AI Implementation Specialist",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    link: "/careers/ai-implementation-specialist",
  },
];

export default function CareersContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Mission to Transform Data Leadership
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be part of a team that's revolutionizing how organizations
              leverage data and AI. We're looking for passionate individuals who
              want to make a real impact.
            </p>
            {/* Replace the existing Button with this updated version */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <ScrollLink href="#positions">View Open Positions</ScrollLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Join Neural Nexus?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
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

      {/* Open Positions Section */}
      <section id="positions" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Open Positions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                        {position.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link
                      href={position.link}
                      className="inline-flex items-center"
                    >
                      Apply Now
                      <Send className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Positions Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't See the Right Position?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send
            us your resume and let us know how you can contribute.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-primary-600 hover:bg-primary-50"
            asChild
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
