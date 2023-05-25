/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import * as Button from 'App/Component/UI/Button'
import Swap from 'App/Component/UI/Swap'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { swapOffAnimate, swapOnAnimate } from 'App/Lib/Framer'
import { motion } from 'framer-motion'

const ButtonIconMotion = motion(Button.Icon)

const TutorialArrows = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const { total, step } = useSettingsTutorial()

  const isNotTheEnd = step.some && step.val !== 'documentation'

  return (
    <>
      <Button.Root
        disabled={step.none || step.val === 'settings-game'}
        className="fixed left-4 top-1/2 min-w-fit -translate-y-1/2 p-2"
        onClick={onBack}
      >
        <Button.Icon>
          <ArrowLeftIcon className="h-5 w-5" />
        </Button.Icon>
      </Button.Root>
      <Button.Root className="fixed right-4 top-1/2 min-w-fit -translate-y-1/2 p-2" onClick={onNext}>
        <Swap
          isOn={isNotTheEnd}
          on={
            <ButtonIconMotion {...swapOnAnimate}>
              <ArrowRightIcon className="absolute inset-0" />
            </ButtonIconMotion>
          }
          off={
            <ButtonIconMotion {...swapOffAnimate}>
              <XMarkIcon className="absolute inset-0" />
            </ButtonIconMotion>
          }
          className="h-5 w-5"
        />
      </Button.Root>
      <div className="mt-4 flex justify-center">
        <span className="rounded-md bg-primary-500 px-2 py-0.5 leading-6 text-white">
          {total.current}/{total.end}
        </span>
      </div>
    </>
  )
}

export default TutorialArrows
