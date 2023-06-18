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

const badge = cva(['inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium'], {
  variants: {
    variant: {
      error: ['bg-red-100 text-red-700'],
      default: ['bg-gray-100 text-gray-600'],
      success: ['bg-green-100 text-green-700'],
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
