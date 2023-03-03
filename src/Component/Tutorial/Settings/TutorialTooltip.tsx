/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Tooltip, { type TooltipProps } from '@mui/material/Tooltip'
import { type TutorialStep, useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { isSome } from 'App/Lib/FpTs'
import { type ComponentProps, forwardRef } from 'react'

export type TutorialTooltipProps = ComponentProps<typeof TutorialTooltip>

const TutorialTooltip = forwardRef<HTMLDivElement, Omit<TooltipProps, 'open' | 'ref'> & { step: TutorialStep }>(
  ({ classes, children, step, ...props }, ref) => {
    const { step: currentStep } = useSettingsTutorial()

    return (
      <Tooltip
        arrow
        open={isSome(currentStep) && currentStep.value === step}
        classes={{ tooltip: 'text-sm px-4 py-2' }}
        ref={ref}
        {...props}
      >
        {children}
      </Tooltip>
    )
  },
)

TutorialTooltip.displayName = 'TutorialTooltip'
export default TutorialTooltip
