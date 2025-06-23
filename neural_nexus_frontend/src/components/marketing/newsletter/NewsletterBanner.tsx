// src/components/marketing/newsletter/NewsletterBanner.tsx

"use client";

import { Button } from "@/components/ui/button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { FormInput } from "@/components/ui/form-input";
import { useForm } from "@/hooks/useForm";
import { subscribeToNewsletter, NewsletterData } from "@/lib/api";

export default function NewsletterBanner() {
  const {
    values,
    feedback,
    isSubmitting,
    updateValue,
    handleSubmit,
  } = useForm<NewsletterData>({
    initialValues: {
      firstName: "",
      email: "",
      source: "banner",
    },
    onSubmit: subscribeToNewsletter,
    onSuccess: () => {
      // Custom success message for newsletter
    },
  });

  // Override default success message for newsletter context
  const displayFeedback = {
    ...feedback,
    message: feedback.type === "success" 
      ? "Thank you for subscribing! Check your email for updates."
      : feedback.message,
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

          <FormFeedback
            type={displayFeedback.type}
            message={displayFeedback.message}
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
          >
            <FormInput
              type="text"
              placeholder="First Name"
              value={values.firstName}
              onChange={(e) => updateValue("firstName", e.target.value)}
              className="flex-1"
              required
            />
            <FormInput
              type="email"
              placeholder="Email Address"
              value={values.email}
              onChange={(e) => updateValue("email", e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="whitespace-nowrap"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
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
