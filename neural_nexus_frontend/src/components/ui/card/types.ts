// src/components/ui/card/types.ts
import { BaseProps } from "../_lib/types";

export interface CardProps extends BaseProps {
  title?: string;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

export interface CardHeaderProps extends BaseProps {
  title: string;
  description?: string;
}

export interface CardFooterProps extends BaseProps {}

export interface CardContentProps extends BaseProps {}
