/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type TutorialStep, useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { type ComponentProps, forwardRef, type ReactNode, type Ref } from 'react'
import * as Tooltip from 'App/Component/UI/Tooltip'
import { twMerge } from 'tailwind-merge'

export type TutorialTooltipProps = ComponentProps<typeof TutorialTooltip>

const TutorialTooltip = forwardRef<
  HTMLElement,
  Omit<Tooltip.TooltipProps, 'open' | 'defaultOpen'> & {
    step: TutorialStep
    title: ReactNode
    side?: Tooltip.TooltipContentProps['side']
    className?: string
  }
>(({ children, title, className, step, side = 'bottom', ...props }, ref) => {
  const { step: currentStep } = useSettingsTutorial()

  return (
    <Tooltip.Root open={currentStep.some && currentStep.val === step}>
      <Tooltip.Trigger asChild ref={ref as Ref<HTMLButtonElement>}>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Content side={side} sideOffset={5} className={twMerge('max-w-lg dark:bg-gray-800', className)}>
        {title}
      </Tooltip.Content>
    </Tooltip.Root>
  )
})

TutorialTooltip.displayName = 'TutorialTooltip'

export default TutorialTooltip
