// Path: src/components/ui/button/types.ts
import { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost" | "white";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
