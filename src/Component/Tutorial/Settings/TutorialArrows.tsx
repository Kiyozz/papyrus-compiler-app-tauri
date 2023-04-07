/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Button from 'App/Component/UI/Button'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

const TutorialArrows = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const { total, step } = useSettingsTutorial()

  return (
    <>
      <Button
        disabled={step.none || step.val === 'settings-game'}
        className="fixed left-4 top-1/2 min-w-fit -translate-y-1/2 p-2"
        onClick={onBack}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </Button>
      <Button className="fixed right-4 top-1/2 min-w-fit -translate-y-1/2 p-2" onClick={onNext}>
        {step.none || step.val !== 'documentation' ? (
          <ArrowRightIcon className="h-5 w-5" />
        ) : (
          <XMarkIcon className="h-5 w-5" />
        )}
      </Button>
      <div className="mt-4 flex justify-center text-xl">
        {total.current}/{total.end}
      </div>
    </>
  )
}

export default TutorialArrows
