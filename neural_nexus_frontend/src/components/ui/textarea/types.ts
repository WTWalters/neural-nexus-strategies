// Path: neural_nexus_frontend/src/components/ui/textarea/types.ts
import { BaseProps } from "@/components/_lib/types";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseProps {
  error?: boolean | string;
  size?: "sm" | "default" | "lg";
}
