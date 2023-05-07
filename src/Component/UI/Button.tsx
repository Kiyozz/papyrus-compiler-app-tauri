/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cloneElement, type ComponentPropsWithoutRef, type ElementRef, type ElementType, forwardRef } from 'react'
import cx from 'classnames'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonElement = ElementRef<typeof Primitive.button>
export type ButtonProps = PrimitivePropsWithRef<typeof Primitive.button> & {
  asChild?: boolean
  size?: Size
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  rounded?: 'default' | 'md' | 'full'
  variant?: 'brand' | 'secondary' | 'soft' | 'link'
  color?: 'default' | 'error' | 'success' | 'warning' | 'inherit'
}

export type ButtonIconProps = ComponentPropsWithoutRef<typeof Slot> & {
  placement?: 'start' | 'end'
  size?: Size
}

const ButtonIcon = forwardRef<HTMLElement, ButtonIconProps>(({ size = 'md', children, placement, ...props }, ref) => (
  <Slot
    className={cx(
      {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-7 w-7',
      }[size],
      placement === 'start' ? '-ml-0.5' : '-mr-0.5',
    )}
    ref={ref}
    {...props}
  >
    {children}
  </Slot>
))

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
      rounded,
      ...props
    },
    ref,
  ) => {
    const Component: ElementType = asChild ? Slot : Primitive.button

    const startIconElement =
      startIcon != null &&
      cloneElement(startIcon, {
        className: cx(
          {
            xs: 'h-3 w-3',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
          }[size],
          '-ml-0.5',
          startIcon.props.className ?? '',
        ),
      })

    const endIconElement =
      endIcon != null &&
      cloneElement(endIcon, {
        className: cx(
          {
            xs: 'h-3 w-3',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
          }[size],
          '-mr-0.5',
          endIcon.props.className ?? '',
        ),
      })

    return (
      <Component
        className={cx(
          'inline-flex items-center font-semibold outline-none transition-shadow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60',
          // rounded
          rounded === 'md' ? 'rounded-md' : rounded === 'full' ? 'rounded-full' : 'rounded',
          // variants
          {
            brand:
              'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-500',
            secondary:
              'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700',
            soft: 'bg-indigo-50 text-indigo-600 shadow-sm hover:bg-indigo-100',
            link: 'text-indigo-600 focus-visible:ring',
          }[variant],
          // sizes
          {
            xs: 'gap-x-1 rounded px-2 py-1 text-xs',
            sm: 'gap-x-1 rounded px-2 py-1 text-sm',
            md: 'gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm',
            lg: 'gap-x-1.5 rounded-md px-3 py-2 text-sm',
            xl: 'gap-x-2 rounded-md px-3.5 py-2.5 text-sm',
          }[size],
          // colors
          {
            default:
              'focus-visible:ring-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-200',
            error:
              'text-red-600 hover:text-red-800 focus-visible:ring-red-400 dark:text-red-400 dark:hover:text-red-300 dark:focus-visible:ring-red-200',
            success:
              'text-green-600 hover:text-green-800 focus-visible:ring-green-400 dark:text-green-400 dark:hover:text-green-300 dark:focus-visible:ring-green-200',
            warning:
              'text-yellow-600 hover:text-yellow-800 focus-visible:ring-yellow-400 dark:text-yellow-400 dark:hover:text-yellow-300 dark:focus-visible:ring-yellow-200',
            inherit:
              'text-inherit hover:opacity-80 focus-visible:ring-inherit dark:text-inherit dark:hover:text-inherit dark:focus-visible:ring-inherit',
          }[color],
          className,
        )}
        type="button"
        {...props}
        ref={ref}
      >
        {startIconElement}
        <Slottable>{children}</Slottable>
        {endIconElement}
      </Component>
    )
  },
)

Button.displayName = 'Button'

export { ButtonIcon as Icon, Button as Root, Button }

export default Button
