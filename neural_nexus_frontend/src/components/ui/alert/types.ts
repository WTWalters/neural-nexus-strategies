// src/components/ui/alert/types.ts
import { BaseProps, VariantProps } from "@/components/_lib/types";

export interface AlertProps extends BaseProps, VariantProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}
