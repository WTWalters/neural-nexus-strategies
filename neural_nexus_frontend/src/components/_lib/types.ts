// Path: src/components/_lib/types.ts
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Base props that all components can extend
 * Maintains compatibility with existing components
 */
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

/**
 * HTML element props without ref
 */
export type BaseElementProps<T extends ElementType> =
  ComponentPropsWithoutRef<T>;

/**
 * Common variant props used across components
 */
export interface VariantProps {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "primary"
    | "secondary"
    | "destructive";
  size?: "default" | "sm" | "md" | "lg" | "xl";
}

/**
 * Base props for form field components
 */
export interface BaseFieldProps extends BaseProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  id?: string;
  name?: string;
}

/**
 * Base props for layout components
 */
export interface BaseLayoutProps extends BaseProps {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  padding?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Base props for card components
 */
export interface BaseCardProps extends BaseProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  onClick?: () => void;
  href?: string;
  elevated?: boolean;
}

/**
 * Base props for button components
 * Extends existing ButtonProps while adding new features
 */
export interface BaseButtonProps
  extends BaseElementProps<HTMLButtonElement>,
    VariantProps {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

/**
 * Base props for navigation items
 */
export interface BaseNavigationItem {
  href: string;
  label: string;
  icon?: ReactNode;
  isExternal?: boolean;
  isActive?: boolean;
}

/**
 * Base props for form components
 */
export interface BaseFormProps extends BaseProps {
  onSubmit: (data: any) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
}

/**
 * Base props for section components
 */
export interface BaseSectionProps extends BaseLayoutProps {
  title?: string;
  subtitle?: string;
  backgroundVariant?: "default" | "alternate" | "primary";
}

/**
 * Base props for input components
 */
export interface BaseInputProps
  extends BaseElementProps<HTMLInputElement>,
    BaseFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
}

/**
 * Base props for select components
 */
export interface BaseSelectProps extends BaseFieldProps {
  options: Array<{
    value: string | number;
    label: string;
  }>;
  placeholder?: string;
}
