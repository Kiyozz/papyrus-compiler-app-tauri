/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, type ElementRef, type ElementType, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const button = cva(
  'inline-flex items-center rounded font-semibold outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60',
  {
    variants: {
      size: {
        xs: ['gap-x-1 rounded px-2 py-1 text-xs'],
        sm: ['gap-x-1 rounded px-2 py-1 text-sm'],
        md: ['gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm'],
        lg: ['gap-x-1.5 rounded-md px-3 py-2 text-sm'],
        xl: ['gap-x-2 rounded-md px-3.5 py-2.5 text-sm'],
      },
      color: {
        default: [],
        error: ['text-red-600 focus-visible:ring-red-400 dark:focus-visible:ring-red-200'],
        success: ['focus-visible:ring-green-400 dark:focus-visible:ring-green-200'],
        warning: ['focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-200'],
        inherit: [],
      },
      variant: {
        brand: [
          'border border-primary-700',
          'bg-primary-700 text-white hover:border-primary-600 hover:bg-primary-600 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
        ],
        ghost: ['text-primary-600 focus-visible:ring focus-visible:ring-primary-600'],
        secondary: [
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/20',
        ],
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'md',
      variant: 'brand',
    },
  },
)

export type ButtonVariants = VariantProps<typeof button>
export type ButtonElement = ElementRef<typeof Primitive.button>
export type ButtonProps = PrimitivePropsWithRef<typeof Primitive.button> &
  ButtonVariants & {
    asChild?: boolean
    startIcon?: JSX.Element
    endIcon?: JSX.Element
  }

const buttonIcon = cva([], {
  variants: {
    size: {
      xs: ['h-3 w-3'],
      sm: ['h-4 w-4'],
      md: ['h-5 w-5'],
      lg: ['h-6 w-6'],
      xl: ['h-7 w-7'],
    },
    edge: {
      start: ['-ml-0.5'],
      end: ['-mr-0.5'],
      default: [''],
    },
  },
  defaultVariants: {
    size: 'md',
    edge: 'default',
  },
})

export type ButtonIconVariants = VariantProps<typeof buttonIcon>
export type ButtonIconProps = ComponentPropsWithoutRef<typeof Slot> & ButtonIconVariants

const ButtonIcon = forwardRef<HTMLElement, ButtonIconProps>(({ size, children, edge, className, ...props }, ref) => (
  <Slot className={twMerge(buttonIcon({ size, edge, className }))} ref={ref} {...props}>
    {children}
  </Slot>
))

ButtonIcon.displayName = 'Button.Icon'

const Button = forwardRef<ButtonElement, ButtonProps>(
  ({ asChild = false, children, className, color, size, startIcon, endIcon, variant, ...props }, ref) => {
    const Component: ElementType = asChild ? Slot : Primitive.button

    return (
      <Component className={twMerge(button({ size, color, variant, className }))} type="button" {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

Button.displayName = 'Button'

export { ButtonIcon as Icon, Button as Root, Button }

export default Button
