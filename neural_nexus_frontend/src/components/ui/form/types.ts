// File: src/components/ui/form/types.ts
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { ControllerProps, FieldValues } from "react-hook-form";
import { BaseProps } from "@/components/_lib/types";

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: string;
}

export interface FormItemContextValue {
  id: string;
}

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends ControllerProps<TFieldValues> {}

export interface FormItemProps extends BaseProps {}

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}

export interface FormControlProps
  extends React.ComponentPropsWithoutRef<typeof Slot> {}

export interface FormDescriptionProps extends BaseProps {
  /**
   * Whether to show an icon before the description
   */
  withIcon?: boolean;
}

export interface FormMessageProps extends BaseProps {
  /**
   * Whether to show an error icon
   */
  showIcon?: boolean;
}
