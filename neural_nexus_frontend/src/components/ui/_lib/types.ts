// src/components/ui/_lib/types.ts
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}
