// src/components/marketing/newsletter/NewsletterBanner.tsx

"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsletterFormData = {
  firstName: string;
  email: string;
  source: string;
};

type NewsletterStatus = "idle" | "submitting" | "success" | "error";
type AlertType = "default" | "destructive" | "success"; // Added success variant

export default function NewsletterBanner() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    firstName: "",
    email: "",
    source: "banner",
  });

  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [feedback, setFeedback] = useState<{
    type: AlertType | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback({ type: null, message: "" });

    try {
      const response = await fetch(
        "http://localhost:8000/api/leads/newsletter/subscribe/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
      setFormData({ firstName: "", email: "", source: "banner" });
    } catch (error) {
      setStatus("error");
      setFeedback({
        type: "destructive",
        message:
          error instanceof Error
            ? error.message
            : "There was an error processing your subscription. Please try again.",
      });
    }
  };

  return (
    <section className="bg-primary-50 border-y border-primary-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Data & AI Insights
          </h2>
          <p className="text-gray-600 mb-6">
            Join our newsletter for the latest trends, best practices, and
            expert insights in data leadership and AI innovation.
          </p>

          {feedback.type && (
            <Alert
              variant={feedback.type === "success" ? "default" : "destructive"}
              className={cn(
                feedback.type === "success"
                  ? "bg-success-50 border-success-200"
                  : "bg-destructive-50 border-destructive-200",
              )}
            >
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
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
              placeholder="Email Address"
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

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
