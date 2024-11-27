// src/components/marketing/home/enhanced-features-section.tsx

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
    title: string;
    description: string;
    insight: string;
    href: string;
}

const FeatureCard = ({
    title,
    description,
    insight,
    href,
}: FeatureCardProps) => (
    <Card className="bg-white transition-shadow hover:shadow-lg h-full">
        <CardContent className="p-6 flex flex-col h-full">
            {/* Content container with flex-grow to push button to bottom */}
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-primary-600 mb-3">
                    {title}
                </h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-800 font-medium mb-2">
                        Latest Insight:
                    </div>
                    <p className="text-sm text-gray-600">{insight}</p>
                </div>
            </div>

            {/* Button container with consistent top margin */}
            <div className="mt-8">
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    asChild
                >
                    <Link href={href}>Learn More</Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default function EnhancedFeaturesSection() {
    const features = [
        {
            title: "Fractional CDO Services",
            description:
                "Expert data leadership without the cost of a full-time executive.",
            insight:
                "Organizations with fractional CDOs see 40% faster implementation of data initiatives",
            href: "/services/fractional-cdo",
        },
        {
            title: "Data Strategy Consulting",
            description:
                "Comprehensive data strategy development and implementation.",
            insight:
                "A well-defined data strategy can reduce operational costs by up to 25%",
            href: "/services/data-strategy",
        },
        {
            title: "AI Readiness",
            description:
                "Prepare your organization for successful AI adoption.",
            insight:
                "Companies with AI readiness assessments are 3x more likely to succeed in AI implementation",
            href: "/services/ai-readiness",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
