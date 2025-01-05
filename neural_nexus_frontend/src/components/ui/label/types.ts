// Path: src/components/ui/label/types.ts
import * as React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  srOnly?: boolean;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
}
