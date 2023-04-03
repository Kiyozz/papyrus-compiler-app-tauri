/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { cloneElement, type Component, type ElementType, type ForwardedRef, forwardRef } from 'react'
import cx from 'classnames'
import { type PolymorphicPropsWithoutRef, type PolymorphicPropsWithRef } from 'react-polymorphic-types'

export type ButtonOwnProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  rounded?: 'default' | 'md' | 'full'
  variant?: 'brand' | 'secondary' | 'soft' | 'link'
  color?: 'default' | 'error' | 'success' | 'warning' | 'inherit'
}

export type ButtonProps<T extends ElementType = 'button'> = PolymorphicPropsWithRef<ButtonOwnProps, T>

/**
 * @see https://github.com/kripod/react-polymorphic-types
 */
function ButtonRoot<T extends ElementType = 'button'>(
  {
    as,
    children,
    className,
    color = 'default',
    size = 'md',
    startIcon,
    endIcon,
    variant = 'brand',
    rounded,
    ...props
  }: PolymorphicPropsWithoutRef<ButtonOwnProps, T>,
  ref: ForwardedRef<Component>,
) {
  const Component: ElementType = as ?? 'button'

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
            'bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-500',
          secondary:
            'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700',
          soft: 'bg-indigo-50 text-indigo-600 shadow-sm hover:bg-indigo-100',
          link: 'focus-visible:ring',
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
            'text-indigo-600 hover:text-indigo-800 focus-visible:ring-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-200',
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
      {children}
      {endIconElement}
    </Component>
  )
}

ButtonRoot.displayName = 'Button'

const Button = forwardRef(ButtonRoot) as <T extends ElementType = 'button'>(
  props: PolymorphicPropsWithRef<ButtonOwnProps, T>,
) => JSX.Element

export default Button
