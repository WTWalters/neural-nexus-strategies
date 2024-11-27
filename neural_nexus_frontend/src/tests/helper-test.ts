// src/tests/helper-test.ts

import { NeuralNexusReactHelper } from "../utils/neural-nexus-helper";

async function testHelper() {
    try {
        console.log("Starting helper test...");

        const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
        if (!apiKey) {
            throw new Error(
                "NEXT_PUBLIC_ANTHROPIC_API_KEY not found in environment variables",
            );
        }

        console.log("API Key found, initializing helper...");
        const helper = new NeuralNexusReactHelper(apiKey);

        console.log("Testing component guidance...");
        const guidance = await helper.getComponentGuidance(
            "ROICalculator",
            "Need to implement the main calculation interface",
        );
        console.log("Component Guidance:", guidance);

        console.log("\nTesting API guidance...");
        const apiGuidance = await helper.getAPIGuidance("/api/roi/calculate");
        console.log("API Guidance:", apiGuidance);
    } catch (error) {
        console.error("Test failed:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
    }
}

console.log("Starting test script...");
testHelper();
