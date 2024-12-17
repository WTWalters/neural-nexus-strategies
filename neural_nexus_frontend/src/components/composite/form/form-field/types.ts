// src/components/composite/form/form-field/types.ts
import { BaseProps } from '@/components/ui/_lib/types'
import { InputProps } from '@/components/ui/input/types'

export interface FormFieldProps extends BaseProps {
  label: string
  error?: string
  required?: boolean
  input: Omit<InputProps, 'label' | 'error'>
}

// src/components/composite/form/form-field/index.tsx
import { FormFieldProps } from './types'
import { Input } from '@/components/ui/input'

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  input,
  className
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <Input
        {...input}
        error={error}
        className="mt-1"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
