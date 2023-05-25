/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { fadeEaseAnimate } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { type ComponentProps, type ElementRef, forwardRef } from 'react'
import * as TooltipRadix from '@radix-ui/react-tooltip'
import { twMerge } from 'tailwind-merge'

export type TooltipProps = TooltipRadix.TooltipProps

const TooltipContentMotion = motion(TooltipRadix.Content)

function Tooltip({ open, defaultOpen, children, onOpenChange, delayDuration = 0, ...props }: TooltipProps) {
  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
        {...props}
      >
        {children}
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  )
}

export type TooltipContentProps = TooltipRadix.TooltipContentProps

const TooltipContent = forwardRef<ElementRef<typeof TooltipContentMotion>, ComponentProps<typeof TooltipContentMotion>>(
  ({ side = 'top', className, align = 'center', children, ...props }, ref) => {
    return (
      <TooltipRadix.Portal>
        <div>
          <AnimatePresence>
            <TooltipContentMotion
              {...fadeEaseAnimate}
              ref={ref}
              side={side}
              align={align}
              className={twMerge('rounded-md bg-gray-900 px-4 py-2 text-lg leading-5 text-white', className)}
              {...props}
            >
              {children}
              <TooltipRadix.Arrow className="fill-gray-900" width={11} height={5} />
            </TooltipContentMotion>
          </AnimatePresence>
        </div>
      </TooltipRadix.Portal>
    )
  },
)

TooltipContent.displayName = 'Tooltip.Content'

const TooltipTrigger = TooltipRadix.Trigger

export { Tooltip as Root, TooltipContent as Content, TooltipTrigger as Trigger }
