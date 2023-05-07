/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { type ElementRef, forwardRef } from 'react'

export type BadgeElement = ElementRef<typeof Primitive.span>
export type BadgeProps = PrimitivePropsWithRef<typeof Primitive.span> & {
  variant?: 'error' | 'success' | 'default'
  className?: string
}

const Badge = forwardRef<BadgeElement, BadgeProps>(
  ({ children, asChild = false, variant = 'default', className }, ref) => {
    const Comp = asChild ? Slot : Primitive.span

    return (
      <Comp
        className={cx(
          'inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium',
          variant === 'error' && 'bg-red-100 text-red-700',
          variant === 'default' && 'bg-gray-100 text-gray-600',
          variant === 'success' && 'bg-green-100 text-green-700',
          className,
        )}
        ref={ref}
      >
        {children}
      </Comp>
    )
  },
)

Badge.displayName = 'Badge'

export default Badge
