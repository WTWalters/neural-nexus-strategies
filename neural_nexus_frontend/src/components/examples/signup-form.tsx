"use client";

import { useState } from "react";
import { FormSection } from "@/components/composite/form/form-section";
import { FormField } from "@/components/composite/form/form-field";
import { FormSubmit } from "@/components/composite/form/form-submit";
import { Input } from "@/components/ui/input";
import { useFormValidation, FormData } from "@/hooks/use-form-validation";

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidation();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      alert("Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[600px] rounded-lg border p-6 shadow-sm"
    >
      <FormSection
        title="Create Account"
        description="Please fill out your information to get started"
        divider={false}
      >
        <FormField label="Full Name" required error={errors.name?.message}>
          <Input {...register("name")} placeholder="Enter your full name" />
        </FormField>

        <FormField
          label="Email"
          required
          error={errors.email?.message}
          description="We'll never share your email"
        >
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Security"
        description="Choose a strong password for your account"
      >
        <FormField
          label="Password"
          required
          error={errors.password?.message}
          description="Must be at least 8 characters with uppercase, lowercase, and numbers"
        >
          <Input
            {...register("password")}
            type="password"
            placeholder="Choose a password"
          />
        </FormField>

        <FormField
          label="Confirm Password"
          required
          error={errors.confirmPassword?.message}
        >
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm your password"
          />
        </FormField>
      </FormSection>

      <FormSubmit
        submitText="Create Account"
        showReset
        isSubmitting={isSubmitting}
        onReset={() => reset()}
        align="right"
        className="mt-6"
      />
    </form>
  );
}
