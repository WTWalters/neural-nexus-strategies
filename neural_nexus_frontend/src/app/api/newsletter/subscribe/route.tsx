// src/app/api/newsletter/subscribe/route.ts
import { type NextRequest } from "next/server";
import { type NewsletterFormData } from "@/types/newsletter";

export async function POST(request: NextRequest) {
    try {
        const data: NewsletterFormData = await request.json();

        // TODO: Add validation
        if (!data.email || !data.firstName) {
            return new Response(
                JSON.stringify({
                    message: "Email and first name are required",
                }),
                { status: 400 },
            );
        }

        // TODO: Add your email service integration here
        // For now, just log and return success
        console.log("Newsletter subscription:", data);

        return new Response(
            JSON.stringify({ message: "Subscription successful" }),
            { status: 200 },
        );
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 },
        );
    }
}
