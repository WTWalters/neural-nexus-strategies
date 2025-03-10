
// Path: neural_nexus_frontend/src/app/services/accelerator/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function AIAcceleratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 pt-10 md:pt-16 pb-20">
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-indigo-800 bg-indigo-50 rounded-full">
            Neural Nexus AI Velocity
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Accelerate Your AI Journey with Confidence
          </h1>
          <p className="mx-auto mb-8 text-xl text-gray-600 md:text-2xl max-w-3xl">
            Transform your organization's approach to AI with our proven velocity framework that drives results, not just readiness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/assessment/quick">
                Start Your 5-Minute Assessment
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="#flywheel">
                Explore the AI Velocity Flywheel
              </Link>
            </Button>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The AI Confidence Crisis</h2>
            <p className="mb-4 text-gray-700">
              Organizations aren't just struggling with data readiness—they're facing an AI confidence crisis. Despite the promise and potential of AI, most companies experience:
            </p>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-red-500 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span><strong>Stalled AI initiatives</strong> due to poor data infrastructure and governance</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-red-500 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span><strong>Fear of project failure</strong> with unclear ROI and implementation paths</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-red-500 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span><strong>Analysis paralysis</strong> when facing complex AI implementation decisions</span>
              </li>
            </ul>
            <p className="text-gray-700">
              It's not just about getting your data ready—it's about creating the confidence, clarity, and momentum to succeed with AI.
            </p>
          </div>
        </div>

        {/* AI Velocity Flywheel */}
        <div id="flywheel" className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              The AI Velocity Flywheel™
            </h2>
            <p className="text-xl text-gray-600">
              Our proven framework accelerates your journey from AI uncertainty to competitive advantage
            </p>
          </div>

          <div className="relative mb-12 md:mb-20">
            <div className="hidden md:block absolute inset-0">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5">
                <div className="w-full h-full rounded-full border-8 border-dashed border-blue-100 animate-spin-slow"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {/* Stage 1: Ignition */}
              <Card className="bg-white relative z-10 border-l-4 border-l-blue-500 transform transition-transform hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">1</span>
                    Ignition
                  </CardTitle>
                  <CardDescription>AI Readiness Assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    A 5-minute assessment that evaluates your current data capabilities and AI potential, providing immediate insights and recommendations.
                  </p>
                </CardContent>
              </Card>

              {/* Stage 2: Acceleration */}
              <Card className="bg-white relative z-10 border-l-4 border-l-purple-500 transform transition-transform hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold">2</span>
                    Acceleration
                  </CardTitle>
                  <CardDescription>Comprehensive Assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    A deep dive into your data ecosystem to identify specific, high-ROI AI opportunities and quantify your AI potential.
                  </p>
                </CardContent>
              </Card>

              {/* Stage 3: Momentum */}
              <Card className="bg-white relative z-10 border-l-4 border-l-indigo-500 transform transition-transform hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold">3</span>
                    Momentum
                  </CardTitle>
                  <CardDescription>Strategic Roadmap</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    A clear 90-day action plan to transform your data foundation and achieve early AI wins, building organizational momentum.
                  </p>
                </CardContent>
              </Card>

              {/* Stage 4: Propulsion */}
              <Card className="bg-white relative z-10 border-l-4 border-l-green-500 transform transition-transform hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold">4</span>
                    Propulsion
                  </CardTitle>
                  <CardDescription>Implementation Support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Hands-on guidance to execute your AI roadmap with confidence, including fractional leadership and technical expertise.
                  </p>
                </CardContent>
              </Card>

              {/* Stage 5: Amplification */}
              <Card className="bg-white relative z-10 border-l-4 border-l-teal-500 transform transition-transform hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 font-bold">5</span>
                    Amplification
                  </CardTitle>
                  <CardDescription>Community & Ecosystem</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Join a community of successful AI leaders, sharing best practices and continuously accelerating your AI capabilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/assessment/quick">
                Start Your AI Velocity Journey
              </Link>
            </Button>
          </div>
        </div>

        {/* Framework Dimensions */}
        <div className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our 7-Dimension Data Readiness Framework
            </h2>
            <p className="text-xl text-gray-600">
              The foundation of our AI Velocity approach is a comprehensive assessment of these critical dimensions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Data Quality & Integrity</CardTitle>
                <CardDescription>The foundation of AI success</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We assess data accuracy, completeness, consistency, and timeliness—factors that determine whether your AI models will provide reliable insights or misleading results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Data Governance & Security</CardTitle>
                <CardDescription>Protection and compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We evaluate your policies, procedures, and controls for managing data assets, ensuring regulatory compliance and mitigating risks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Technical Infrastructure</CardTitle>
                <CardDescription>The engine for AI processing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We examine your storage, computing resources, and architecture to ensure they can support the demands of AI workloads and scale as needed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Data Integration & Accessibility</CardTitle>
                <CardDescription>Breaking down silos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We assess how effectively data flows between systems and is accessible to users and AI applications, identifying bottlenecks and integration gaps.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>AI-Specific Data Structures</CardTitle>
                <CardDescription>Optimized for machine learning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We evaluate your feature engineering processes, labeled datasets, and model training infrastructure—specialized requirements for effective AI.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Organizational Readiness</CardTitle>
                <CardDescription>People and processes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We assess leadership support, data literacy, and organizational culture—the human elements that determine AI adoption success.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Operational Implementation</CardTitle>
                <CardDescription>From models to production</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We evaluate your MLOps capabilities, deployment processes, and monitoring systems to ensure AI solutions deliver sustained value in production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12 text-white">
              <h2 className="mb-4 text-3xl font-bold">Ready to Accelerate Your AI Journey?</h2>
              <p className="mb-6 text-lg text-blue-100">
                Start with our 5-minute AI Readiness Assessment and get immediate insights into your organization's AI potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/assessment/quick">
                  Take the Assessment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-700" asChild>
                  <Link href="/contact">
                    Talk to an Expert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials or Case Studies */}
        <div className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how organizations are achieving AI velocity with our framework
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Financial Services Firm</h3>
                  <p className="text-sm text-gray-600">Data Readiness Transformation</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4">
                "The AI Velocity framework helped us identify critical gaps in our data architecture that were blocking our AI initiatives. Within 90 days, we saw a 40% improvement in data quality and successfully launched our first machine learning models."
              </blockquote>
              <p className="text-sm font-medium text-gray-900">
                - Chief Data Officer
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Healthcare Provider</h3>
                  <p className="text-sm text-gray-600">AI Implementation</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4">
                "We were stuck in analysis paralysis with our AI strategy. The Neural Nexus framework gave us the clarity and confidence to move forward. Their structured approach helped us prioritize use cases and build a foundation for sustainable AI success."
              </blockquote>
              <p className="text-sm font-medium text-gray-900">
                - VP of Digital Transformation
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
