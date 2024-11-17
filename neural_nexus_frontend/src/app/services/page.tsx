// src/app/services/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Transform Your Organization with Expert Data
                            Leadership
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Choose from our comprehensive suite of services
                            designed to help organizations leverage data and AI
                            for strategic advantage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Fractional CDO */}
                        <div className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="p-6 bg-primary-50">
                                <h2 className="text-2xl font-bold text-primary-600 mb-2">
                                    Fractional CDO
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Expert data leadership without the full-time
                                    executive cost.
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Strategic data leadership
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Team development & mentoring
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Technology stack evaluation
                                        </span>
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-600 mb-4">
                                    Starting at $5,000/month
                                </p>
                                <Button className="w-full" asChild>
                                    <Link href="/services/fractional-cdo">
                                        Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Data Strategy */}
                        <div className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="p-6 bg-innovation-50">
                                <h2 className="text-2xl font-bold text-innovation-600 mb-2">
                                    Data Strategy
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Comprehensive data strategy development and
                                    implementation.
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-innovation-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Maturity assessment
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-innovation-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Roadmap creation
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-innovation-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Implementation support
                                        </span>
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-600 mb-4">
                                    Projects from $15,000
                                </p>
                                <Button className="w-full" asChild>
                                    <Link href="/services/data-strategy">
                                        Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* AI Readiness */}
                        <div className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="p-6 bg-success-50">
                                <h2 className="text-2xl font-bold text-success-600 mb-2">
                                    AI Readiness
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Prepare your organization for successful AI
                                    adoption.
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            AI capability assessment
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Use case identification
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                                        <span className="text-gray-600">
                                            Implementation planning
                                        </span>
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-600 mb-4">
                                    Starting at $10,000
                                </p>
                                <Button className="w-full" asChild>
                                    <Link href="/services/ai-readiness">
                                        Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Choose the Right Service
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                                        Service
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                                        Best For
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                                        Timeframe
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                                        Outcome
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-primary-600">
                                            Fractional CDO
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        Organizations needing ongoing expert
                                        data leadership
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        Ongoing monthly engagement
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        Strategic data leadership and execution
                                        support
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-innovation-600">
                                            Data Strategy
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        Companies starting their data
                                        transformation journey
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        2-12 weeks depending on scope
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        Comprehensive strategy and
                                        implementation plan
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-success-600">
                                            AI Readiness
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        Organizations planning AI initiatives
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        2-8 weeks depending on scope
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        AI readiness assessment and
                                        implementation roadmap
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Not Sure Which Service is Right for You?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Schedule a free consultation to discuss your needs and
                        we'll help you choose the best path forward.
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-primary-600 hover:bg-primary-50"
                        asChild
                    >
                        <Link href="/book-call">Schedule Consultation</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

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
