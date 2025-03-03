"use client";

// src/components/landing-page/sections/CtaDownload.tsx
//
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface CtaDownloadProps {
  content: {
    headline: string;
    description: string;
    image: string;
    form: {
      title: string;
      fields: Array<{
        type: string;
        name: string;
        label: string;
        required: boolean;
      }>;
      submitText: string;
    };
  };
}

export function CtaDownload({ content }: CtaDownloadProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback({ type: null, message: "" });

    try {
      const response = await fetch("/api/leads/resource-download/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setFeedback({
        type: "success",
        message: "Your download is ready! Check your email for the guide.",
      });
      setFormData({});
    } catch (error) {
      setStatus("error");
      setFeedback({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to process download",
      });
    }
  };

  return (
    <section className="bg-gray-50 py-16" id="download-form">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{content.headline}</h2>
            <p className="text-lg text-gray-600 mb-6">{content.description}</p>
            <img
              src="/api/placeholder/400/600" // Using your placeholder API
              alt="Whitepaper Preview"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">
              {content.form.title}
            </h3>

            {feedback.type && (
              <Alert
                variant={feedback.type === "error" ? "destructive" : "default"}
                className={cn(
                  "mb-6",
                  feedback.type === "success" &&
                    "border-green-500 text-green-700 bg-green-50",
                  feedback.type === "info" &&
                    "border-blue-500 text-blue-700 bg-blue-50",
                )}
              >
                <AlertDescription>{feedback.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {content.form.fields.map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label} {field.required && "*"}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full ${
                  status === "submitting"
                    ? "bg-primary-400"
                    : "bg-primary-600 hover:bg-primary-700"
                } text-white px-6 py-3 rounded-md transition-colors duration-200`}
              >
                {status === "submitting"
                  ? "Processing..."
                  : content.form.submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}