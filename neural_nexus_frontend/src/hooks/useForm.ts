// Unified form state management hook

import { useState } from "react";
import { ApiResponse } from "@/lib/api";

// Form status types
export type FormStatus = "idle" | "submitting" | "success" | "error";

// Form feedback types
export interface FormFeedback {
  type: "success" | "error" | null;
  message: string;
}

// Form configuration
interface UseFormConfig<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<ApiResponse>;
  onSuccess?: (data?: any) => void;
  onError?: (error: string) => void;
  resetOnSuccess?: boolean;
}

// Form hook return type
interface UseFormReturn<T> {
  values: T;
  status: FormStatus;
  feedback: FormFeedback;
  isSubmitting: boolean;
  updateValue: (key: keyof T, value: any) => void;
  updateValues: (updates: Partial<T>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  clearFeedback: () => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  onSuccess,
  onError,
  resetOnSuccess = true,
}: UseFormConfig<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<FormFeedback>({
    type: null,
    message: "",
  });

  const updateValue = (key: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const updateValues = (updates: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...updates }));
  };

  const clearFeedback = () => {
    setFeedback({ type: null, message: "" });
  };

  const reset = () => {
    setValues(initialValues);
    setStatus("idle");
    clearFeedback();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    clearFeedback();

    try {
      const response = await onSubmit(values);

      if (response.success) {
        setStatus("success");
        setFeedback({
          type: "success",
          message: "Success! Your submission has been processed.",
        });

        if (resetOnSuccess) {
          setValues(initialValues);
        }

        onSuccess?.(response.data);
      } else {
        setStatus("error");
        setFeedback({
          type: "error",
          message: response.error?.message || "An error occurred. Please try again.",
        });

        onError?.(response.error?.message || "Unknown error");
      }
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      
      setFeedback({
        type: "error",
        message: errorMessage,
      });

      onError?.(errorMessage);
    }
  };

  return {
    values,
    status,
    feedback,
    isSubmitting: status === "submitting",
    updateValue,
    updateValues,
    handleSubmit,
    reset,
    clearFeedback,
  };
}