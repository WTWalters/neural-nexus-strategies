import { BaseProps } from "@/components/_lib/types";
import { ReactNode } from "react";

export interface ContentCardProps extends BaseProps {
  /**
   * Title of the card
   */
  title: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional image properties
   */
  image?: {
    src: string;
    alt: string;
    aspectRatio?: "square" | "video" | "wide";
  };

  /**
   * Optional actions to display at the bottom
   */
  actions?: ReactNode;

  /**
   * Optional link to wrap the card
   */
  href?: string;

  /**
   * Visual variant of the card
   */
  variant?: "default" | "bordered" | "elevated";

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Optional footer content
   */
  footer?: ReactNode;

  /**
   * Optional hover effect
   */
  hover?: boolean;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export type CardAspectRatio = "square" | "video" | "wide";
