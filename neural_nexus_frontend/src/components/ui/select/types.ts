// src/components/ui/select/types.ts
import { BaseProps } from "../_lib/types";

export interface SelectProps extends BaseProps {
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
}
