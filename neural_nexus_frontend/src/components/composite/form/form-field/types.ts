import { BaseFieldProps } from '@/components/_lib/types'
import { InputProps } from '@/components/ui/input'
import { SelectProps } from '@/components/ui/select'
import { TextareaProps } from '@/components/ui/textarea'

export type FormFieldInputElement = InputProps | SelectProps | TextareaProps

export interface FormFieldProps extends BaseFieldProps {
  /**
   * The form field input element (Input, Select, or Textarea)
   */
  children: React.ReactElement<FormFieldInputElement>
  
  /**
   * Optional helper text to display below the field
   */
  helperText?: string
  
  /**
   * Whether to show the required asterisk
   * @default false
   */
  showRequiredIndicator?: boolean
}
