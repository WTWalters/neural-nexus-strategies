// src/components/ui/input/types.ts
import { BaseProps } from "../_lib/types";

export interface InputProps
  extends BaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: string;
  label?: string;
  size?: "default" | "sm" | "lg";
}
