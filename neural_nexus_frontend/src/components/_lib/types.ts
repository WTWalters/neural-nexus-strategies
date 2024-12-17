import { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Base props that all components can extend
 */
export interface BaseProps {
  className?: string
  children?: ReactNode
}

/**
 * HTML element props without ref
 */
export type BaseElementProps<T extends HTMLElement> = ComponentPropsWithoutRef<T>

/**
 * Component size variants
 */
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Common variant props used across components
 */
export interface VariantProps {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link'
  size?: SizeVariant
}

/**
 * Base props for form field components
 */
export interface BaseFieldProps extends BaseProps {
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  description?: string
  id?: string
}

/**
 * Base props for layout components
 */
export interface BaseLayoutProps extends BaseProps {
  as?: keyof JSX.IntrinsicElements
  id?: string
}

/**
 * Base props for card components
 */
export interface BaseCardProps extends BaseProps {
  title?: string
  description?: string
  footer?: ReactNode
  image?: {
    src: string
    alt: string
  }
}

/**
 * Base props for button components
 */
export interface BaseButtonProps extends BaseElementProps<HTMLButtonElement>, VariantProps {
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/**
 * Base props for navigation items
 */
export interface BaseNavigationItem {
  href: string
  label: string
  icon?: ReactNode
  isExternal?: boolean
}

/**
 * Base props for form components
 */
export interface BaseFormProps extends BaseProps {
  onSubmit: (data: any) => Promise<void> | void
  isLoading?: boolean
  submitLabel?: string
}
