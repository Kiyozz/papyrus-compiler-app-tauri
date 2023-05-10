/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type PrimitivePropsWithRef, Primitive } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { type ElementRef, forwardRef } from 'react'

export type EmptyStateElement = ElementRef<typeof Primitive.div>
export type EmptyStateProps = PrimitivePropsWithRef<typeof Primitive.div>

const EmptyState = forwardRef<EmptyStateElement, EmptyStateProps>(({ asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : Primitive.div

  return (
    <Primitive.div className="flex grow items-center justify-center py-8" {...props} ref={ref}>
      <Comp className="flex flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-dashed border-gray-300 px-28 py-16 text-center">
        {children}
      </Comp>
    </Primitive.div>
  )
})

EmptyState.displayName = 'EmptyState.Root'

export type EmptyStateIconElement = ElementRef<typeof Slot>
export type EmptyStateIconProps = PrimitivePropsWithRef<typeof Slot>

const EmptyStateIcon = forwardRef<EmptyStateIconElement, EmptyStateIconProps>((props, ref) => {
  return <Slot className="h-12 w-12 text-gray-400" {...props} ref={ref} />
})

EmptyStateIcon.displayName = 'EmptyState.Icon'

export type EmptyStateTextElement = ElementRef<typeof Primitive.p>
export type EmptyStateTextProps = PrimitivePropsWithRef<typeof Primitive.p>

const EmptyStateText = forwardRef<EmptyStateTextElement, EmptyStateTextProps>(
  ({ asChild = false, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.p

    return (
      <Comp className={cx('text-sm font-semibold text-gray-900', className)} {...props} ref={ref}>
        {children}
      </Comp>
    )
  },
)

EmptyStateText.displayName = 'EmptyState.Text'

export { EmptyState as Root, EmptyStateIcon as Icon, EmptyStateText as Text, EmptyState }
