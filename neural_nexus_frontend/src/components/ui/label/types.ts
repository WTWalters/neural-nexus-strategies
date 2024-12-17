import { ComponentPropsWithoutRef } from "react";
import { BaseProps } from "@/components/_lib/types";

export interface LabelProps
  extends BaseProps,
    ComponentPropsWithoutRef<"label"> {
  htmlFor?: string;
}
