// File: src/components/ui/alert/index.tsx
import { cn } from "@/lib/utils";
import { AlertProps, AlertDescriptionProps } from "./types";

export function Alert({
    children,
    variant = "default",
    className,
}: AlertProps) {
    const baseStyles = "rounded-lg p-4 mb-4 text-sm";

    const variantStyles = {
        default: "bg-[var(--colors-alert-info-background)] text-[var(--colors-alert-info-foreground)]",
        destructive: "bg-[var(--colors-alert-error-background)] text-[var(--colors-alert-error-foreground)]",
        success: "bg-[var(--colors-alert-success-background)] text-[var(--colors-alert-success-foreground)]"
    };

    return (
        <div
            className={cn(baseStyles, variantStyles[variant], className)}
            role="alert"
        >
            {children}
        </div>
    );
}

export function AlertDescription({ 
    children,
    className 
}: AlertDescriptionProps) {
    return <div className={cn("mt-1", className)}>{children}</div>;
}