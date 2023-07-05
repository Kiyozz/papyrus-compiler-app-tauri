/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { type ElementRef, forwardRef } from 'react'

const badge = cva(['inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'], {
  variants: {
    variant: {
      error: ['bg-red-50 text-red-700 ring-red-600/10', 'dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20'],
      default: [
        'bg-gray-50 text-gray-600 ring-gray-500/10',
        'dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20',
      ],
      success: [
        'bg-green-50 text-green-700 ring-green-600/20',
        'dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type BadgeVariants = VariantProps<typeof badge>
export type BadgeElement = ElementRef<typeof Primitive.span>
export type BadgeProps = PrimitivePropsWithRef<typeof Primitive.span> & BadgeVariants

const Badge = forwardRef<BadgeElement, BadgeProps>(
  ({ children, asChild = false, variant = 'default', className }, ref) => {
    const Comp = asChild ? Slot : Primitive.span

    return (
      <Comp className={twMerge(badge({ variant, className }))} ref={ref}>
        {children}
      </Comp>
    )
  },
)

Badge.displayName = 'Badge'

export default Badge
