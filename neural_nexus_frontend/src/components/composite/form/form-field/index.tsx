"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "./types";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  disabled,
  description,
  helperText,
  children,
  className,
  showRequiredIndicator = true,
  id: customId,
  ...props
}) => {
  const generatedId = useId();
  const id = customId ?? generatedId;

  return (
    <FormItem
      className={cn("w-full", className)}
      data-testid="form-field"
      {...props}
    >
      {label && (
        <FormLabel htmlFor={id} className={cn(error && "text-destructive")}>
          {label}
          {required && showRequiredIndicator && (
            <span className="text-destructive ml-1">*</span>
          )}
        </FormLabel>
      )}
      <FormControl>
        {React.cloneElement(children, {
          id,
          "aria-describedby": description ? `${id}-description` : undefined,
          "aria-invalid": error ? "true" : undefined,
          disabled,
          ...children.props,
        })}
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
      )}
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default FormField;
