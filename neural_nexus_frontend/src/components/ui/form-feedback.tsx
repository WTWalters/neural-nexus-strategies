import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FormFeedbackProps {
  type: "success" | "error" | null;
  message: string;
  className?: string;
}

/**
 * Reusable form feedback component for success and error messages
 */
export function FormFeedback({ type, message, className }: FormFeedbackProps) {
  if (!type || !message) {
    return null;
  }

  return (
    <Alert
      variant={type === "success" ? "default" : "destructive"}
      className={cn(
        "mb-4",
        type === "success"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800",
        className
      )}
    >
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}