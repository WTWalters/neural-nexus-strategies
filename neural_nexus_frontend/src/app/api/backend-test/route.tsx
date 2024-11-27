// src/app/api/backend-test/route.tsx

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("Attempting to connect to backend at:", apiUrl);

        // Use the services endpoint which we know exists
        const response = await fetch(`${apiUrl}/api/services/`);
        const data = await response.json();

        return NextResponse.json({
            status: "success",
            services: data,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Backend connection error:", error);
        return NextResponse.json(
            {
                status: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to connect to backend",
                endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/services/`,
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    }
}
