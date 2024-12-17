// src/components/ui/button/types.ts
import { BaseProps, VariantProps } from "../_lib/types";

export interface ButtonProps extends BaseProps, VariantProps {
  asChild?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
