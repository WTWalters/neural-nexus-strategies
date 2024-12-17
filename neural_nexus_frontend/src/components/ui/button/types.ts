// src/components/ui/button/types.ts
import { BaseButtonProps } from "@/components/_lib/types";

export interface ButtonProps extends BaseButtonProps {
  // Existing button-specific props remain
  asChild?: boolean;
  fullWidth?: boolean;
}
