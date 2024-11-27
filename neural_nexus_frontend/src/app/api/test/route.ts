// src/app/api/test/route.ts

import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({
            status: "success",
            message: "API route working correctly",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
}
