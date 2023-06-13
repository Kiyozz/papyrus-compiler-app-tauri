/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { type ComponentPropsWithoutRef, type ElementRef, type ElementType, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonElement = ElementRef<typeof Primitive.button>
export type ButtonProps = PrimitivePropsWithRef<typeof Primitive.button> & {
  asChild?: boolean
  size?: Size
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  variant?: 'brand' | 'secondary' | 'ghost'
  color?: 'default' | 'error' | 'success' | 'warning' | 'inherit'
}

export type ButtonIconProps = ComponentPropsWithoutRef<typeof Slot> & {
  edge?: 'start' | 'end'
  size?: Size
}

const ButtonIcon = forwardRef<HTMLElement, ButtonIconProps>(
  ({ size = 'md', children, edge, className, ...props }, ref) => (
    <Slot
      className={twMerge(
        size === 'xs' && 'h-3 w-3',
        size === 'sm' && 'h-4 w-4',
        size === 'md' && 'h-5 w-5',
        size === 'lg' && 'h-6 w-6',
        size === 'xl' && 'h-7 w-7',
        edge === 'start' ? '-ml-0.5' : edge === 'end' ? '-mr-0.5' : '',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Slot>
  ),
)

ButtonIcon.displayName = 'Button.Icon'

const Button = forwardRef<ButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      color = 'default',
      size = 'md',
      startIcon,
      endIcon,
      variant = 'brand',
      ...props
    },
    ref,
  ) => {
    const Component: ElementType = asChild ? Slot : Primitive.button

    return (
      <Component
        className={twMerge(
          'inline-flex items-center rounded font-semibold outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60',
          variant === 'brand' &&
            'border border-primary-700 bg-primary-700 text-white hover:border-primary-600 hover:bg-primary-600 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          variant === 'secondary' &&
            'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/20',
          variant === 'ghost' && 'text-primary-600 focus-visible:ring focus-visible:ring-primary-600',
          size === 'xs' && 'gap-x-1 rounded px-2 py-1 text-xs',
          size === 'sm' && 'gap-x-1 rounded px-2 py-1 text-sm',
          size === 'md' && 'gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm',
          size === 'lg' && 'gap-x-1.5 rounded-md px-3 py-2 text-sm',
          size === 'xl' && 'gap-x-2 rounded-md px-3.5 py-2.5 text-sm',
          color === 'error' && 'text-red-600 focus-visible:ring-red-400 dark:focus-visible:ring-red-200',
          color === 'success' && 'focus-visible:ring-green-400 dark:focus-visible:ring-green-200',
          color === 'warning' && 'focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-200',
          variant === 'brand' &&
            color === 'error' &&
            'border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500 hover:text-white focus-visible:ring-red-400',
          className,
        )}
        type="button"
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    )
  },
)

Button.displayName = 'Button'

export { ButtonIcon as Icon, Button as Root, Button }

export default Button
