// src/components/marketing/newsletter/newsletter-content-end.tsx

"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { env } from "@/config/env";

type NewsletterStatus = "idle" | "submitting" | "success" | "error";

export function NewsletterContentEnd() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback({ type: null, message: "" });

    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/leads/newsletter/subscribe/`, // Updated this line
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            source: "content-end",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setFeedback({
        type: "success",
        message: "Thank you for subscribing! Check your email for updates.",
      });
      setFormData({ firstName: "", email: "" });
    } catch (error) {
      setStatus("error");
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "There was an error processing your subscription. Please try again.",
      });
    }
  };

  return (
    <Card className="max-w-xl mx-auto my-8 bg-primary-50 border-primary-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-center">
          Enjoy this content?
        </CardTitle>
        <CardDescription className="text-center">
          Subscribe to our newsletter for more insights on data leadership and
          AI innovation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {feedback.type && (
          <Alert
            variant={feedback.type === "error" ? "destructive" : "default"}
            className={cn(
              "mb-4",
              feedback.type === "success" &&
                "border-green-500 text-green-700 bg-green-50",
              feedback.type === "info" &&
                "border-blue-500 text-blue-700 bg-blue-50",
            )}
          >
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            required
          />
          <input
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            required
          />
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="whitespace-nowrap"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        <p className="text-xs text-gray-500 mt-3 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
}
