// src/components/calculators/AIROICalculator.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface ROIInputs {
    revenue: number;
    employees: number;
    processHours: number;
    dataQuality: number;
    hourlyRate: number;
    implementationCost: number;
}

interface ROIResults {
    annualSavings: number;
    revenueIncrease: number;
    productivityGains: number;
    qualityImprovements: number;
    totalBenefit: number;
    roi: number;
    paybackPeriods: number;
}

export default function AIROICalculator() {
    const [inputs, setInputs] = useState<ROIInputs>({
        revenue: 1000000,
        employees: 100,
        processHours: 1000,
        dataQuality: 70,
        hourlyRate: 50,
        implementationCost: 75000,
    });

    const [results, setResults] = useState<ROIResults | null>(null);

    const calculateROI = () => {
        // Process Automation Savings
        const automationSavings = inputs.processHours * inputs.hourlyRate * 0.3; // Assume 30% process efficiency gain

        // Revenue Impact
        const revenueIncrease = inputs.revenue * 0.05; // Assume 5% revenue increase through AI insights

        // Productivity Gains
        const productivityGains =
            inputs.employees * inputs.hourlyRate * 160 * 0.15; // Assume 15% productivity increase

        // Data Quality Improvements
        const qualityImprovements =
            ((100 - inputs.dataQuality) / 100) * inputs.revenue * 0.02; // Impact of improved data quality

        const totalBenefit =
            automationSavings +
            revenueIncrease +
            productivityGains +
            qualityImprovements;

        const roi =
            ((totalBenefit - inputs.implementationCost) /
                inputs.implementationCost) *
            100;

        const paybackPeriods = inputs.implementationCost / (totalBenefit / 12);

        setResults({
            annualSavings: automationSavings,
            revenueIncrease,
            productivityGains,
            qualityImprovements,
            totalBenefit,
            roi,
            paybackPeriods,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>AI ROI Calculator</CardTitle>
                    <CardDescription>
                        Estimate the potential return on investment for your AI
                        initiatives
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">
                                Organization Details
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Annual Revenue
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.revenue}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                revenue: Number(e.target.value),
                                            })
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number of Employees
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.employees}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                employees: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Annual Manual Process Hours
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.processHours}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                processHours: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Data Quality Score (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.dataQuality}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                dataQuality: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Average Hourly Rate
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.hourlyRate}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                hourlyRate: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Estimated Implementation Cost
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.implementationCost}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                implementationCost: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <Button
                                    onClick={calculateROI}
                                    className="w-full mt-4"
                                >
                                    Calculate ROI
                                </Button>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">
                                Projected Returns
                            </h3>

                            {results && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="p-4">
                                            <p className="text-sm text-gray-600">
                                                Annual ROI
                                            </p>
                                            <p className="text-2xl font-bold text-success-600">
                                                {results.roi.toFixed(1)}%
                                            </p>
                                        </Card>
                                        <Card className="p-4">
                                            <p className="text-sm text-gray-600">
                                                Payback Period
                                            </p>
                                            <p className="text-2xl font-bold text-success-600">
                                                {results.paybackPeriods.toFixed(
                                                    1,
                                                )}{" "}
                                                months
                                            </p>
                                        </Card>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium">
                                            Benefit Breakdown
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Process Automation Savings
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(
                                                        results.annualSavings,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Revenue Impact
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(
                                                        results.revenueIncrease,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Productivity Gains
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(
                                                        results.productivityGains,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Quality Improvements
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(
                                                        results.qualityImprovements,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="border-t pt-2 mt-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">
                                                        Total Annual Benefit
                                                    </span>
                                                    <span className="font-bold text-success-600">
                                                        {formatCurrency(
                                                            results.totalBenefit,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">
                                            Next Steps
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Based on your inputs, AI
                                            implementation could provide
                                            significant returns. Schedule a
                                            consultation to discuss a detailed
                                            implementation plan.
                                        </p>
                                        <Button asChild>
                                            <a href="/book-call">
                                                Schedule Consultation
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
