// src/components/marketing/home/featured-insight.tsx

import { ActionLink } from "@/components/ui/action-link";
import { Lightbulb } from "lucide-react";

export default function FeaturedInsight() {
    return (
        <div className="bg-primary-50 border-y border-primary-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-primary-600" />
                        <span className="text-sm font-medium text-primary-900">
                            Latest Insight:
                        </span>
                        <span className="text-sm text-gray-600 md:line-clamp-1">
                            Why 76% of Fortune 500 companies are prioritizing
                            data leadership in 2024
                        </span>
                    </div>
                    <ActionLink
                        href="/blog/data-leadership-trends"
                        variant="ghost"
                        size="sm"
                        className="text-primary-600 shrink-0"
                    >
                        Read More
                    </ActionLink>
                </div>
            </div>
        </div>
    );
}
