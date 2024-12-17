// src/components/ui/alert/types.ts
import { BaseProps } from "../_lib/types";

export interface AlertProps extends BaseProps {
  variant?: "default" | "destructive";
  title?: string;
}
