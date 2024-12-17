"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { ContentCardProps, CardAspectRatio } from "./types";

const aspectRatioClasses: Record<CardAspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[2/1]",
};

const variantClasses = {
  default: "bg-card",
  bordered: "border-2",
  elevated: "shadow-lg hover:shadow-xl transition-shadow",
};

export const ContentCard = ({
  title,
  description,
  image,
  actions,
  href,
  variant = "default",
  isLoading,
  footer,
  hover = true,
  onClick,
  className,
  children,
  ...props
}: ContentCardProps) => {
  const CardWrapper = href ? Link : "div";
  const imageAspectRatio = image?.aspectRatio || "video";

  const content = (
    <Card
      className={cn(
        "overflow-hidden",
        variantClasses[variant],
        hover && !isLoading && "hover:border-border/80",
        isLoading && "animate-pulse",
        className,
      )}
      {...props}
    >
      {image && (
        <div
          className={cn(
            "relative overflow-hidden",
            aspectRatioClasses[imageAspectRatio],
          )}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold leading-tight tracking-tight">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}

        {actions && (
          <div className="mt-6 flex items-center gap-4">{actions}</div>
        )}
      </div>

      {footer && <div className="border-t p-4 bg-muted/50">{footer}</div>}
    </Card>
  );

  if (href) {
    return (
      <CardWrapper href={href} onClick={onClick} className="block">
        {content}
      </CardWrapper>
    );
  }

  return <CardWrapper onClick={onClick}>{content}</CardWrapper>;
};

export default ContentCard;
