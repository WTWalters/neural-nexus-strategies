// File: src/components/ui/label/types.ts
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  srOnly?: boolean;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
}
