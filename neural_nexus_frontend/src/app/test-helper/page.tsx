// src/app/test-helper/page.tsx

"use client";

import { useEffect, useState } from "react";
import { NeuralNexusReactHelper } from "@/utils/neural-nexus-helper";

export default function TestHelper() {
    const [guidance, setGuidance] = useState<string>("Loading...");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function testHelper() {
            try {
                console.log("Starting helper test...");

                const helper = new NeuralNexusReactHelper(
                    process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!,
                );
                console.log("Helper initialized");

                const result = await helper.getComponentGuidance(
                    "ROICalculator",
                    "Testing helper functionality",
                );
                console.log("Received guidance:", result);

                setGuidance(result.implementation);
            } catch (err) {
                console.error("Error testing helper:", err);
                setError(
                    err instanceof Error ? err.message : "An error occurred",
                );
            }
        }

        testHelper();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Neural Nexus Helper Test
            </h1>

            {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            ) : (
                <div className="bg-white shadow-md rounded px-8 py-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Component Guidance:
                    </h2>
                    <pre className="bg-gray-100 p-4 rounded">{guidance}</pre>
                </div>
            )}
        </div>
    );
}
