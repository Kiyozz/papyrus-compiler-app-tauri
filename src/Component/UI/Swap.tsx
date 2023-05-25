/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { AnimatePresence } from 'framer-motion'
import { type ComponentPropsWithoutRef, forwardRef, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type SwapElement = HTMLSpanElement
export type SwapProps = Omit<
  ComponentPropsWithoutRef<'span'> & {
    isOn: boolean
    on: ReactNode
    off: ReactNode
  },
  'children'
>

const Swap = forwardRef<SwapElement, SwapProps>(({ isOn, on, off, className, ...props }, ref) => {
  return (
    <span {...props} className={twMerge('relative w-full', className)} ref={ref}>
      <AnimatePresence mode="popLayout">{isOn ? on : off}</AnimatePresence>
    </span>
  )
})

Swap.displayName = 'Swap.Root'

export default Swap
