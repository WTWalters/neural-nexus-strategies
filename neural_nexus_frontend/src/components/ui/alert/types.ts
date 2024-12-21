// File: src/components/ui/alert/types.ts
import { BaseProps } from "@/components/_lib/types";

export type AlertVariant = "default" | "destructive" | "success";

export interface AlertProps extends BaseProps {
    /**
     * The content of the alert
     */
    children: React.ReactNode;
    
    /**
     * The variant of the alert
     * @default "default"
     */
    variant?: AlertVariant;
}

export interface AlertDescriptionProps extends BaseProps {
    /**
     * The content of the alert description
     */
    children: React.ReactNode;
}