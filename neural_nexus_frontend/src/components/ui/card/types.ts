// File: src/components/ui/card/types.ts
import { BaseProps } from "@/components/_lib/types";

export interface CardProps extends BaseProps {
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;

  /**
   * Whether to disable hover effects
   */
  disableHover?: boolean;
}

export interface CardHeaderProps extends BaseProps {
  /**
   * Whether to reduce the padding
   */
  compact?: boolean;
}

export interface CardTitleProps extends BaseProps {
  /**
   * Whether to preserve line breaks
   */
  preserveLineBreaks?: boolean;
}

export interface CardDescriptionProps extends BaseProps {
  /**
   * Number of lines to truncate at
   */
  lineClamp?: number;
}

export interface CardContentProps extends BaseProps {
  /**
   * Whether to remove padding
   */
  noPadding?: boolean;
}

export interface CardFooterProps extends BaseProps {
  /**
   * Alignment of footer items
   */
  align?: "start" | "center" | "end";
}
