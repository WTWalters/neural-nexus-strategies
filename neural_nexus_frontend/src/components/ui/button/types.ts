// Path: src/components/ui/button/types.ts
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./theme";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: "default" | "outline" | "destructive" | "ghost" | "white"; // Added "white"
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
