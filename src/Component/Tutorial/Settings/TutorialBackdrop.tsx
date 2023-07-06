/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { XMarkIcon } from '@heroicons/react/24/outline'
import TutorialArrows from 'App/Component/Tutorial/Settings/TutorialArrows'
import * as Button from 'App/Component/UI/Button'
import { type TutorialRefs, useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const TutorialBackdrop = ({
  onBack,
  onNext,
  tutorialRef,
}: {
  onBack: () => void
  onNext: () => void
  tutorialRef: keyof TutorialRefs
}) => {
  const { scrollInto, skip, step } = useSettingsTutorial()
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => {
      scrollInto(tutorialRef)

      return false
    }

    window.addEventListener('scroll', onScroll, { capture: true, passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [scrollInto, tutorialRef])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onNext()
      } else if (e.key === 'ArrowLeft') {
        onBack()
      } else if (e.key === 'Escape') {
        skip('skipKey')
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [onBack, onNext, skip])

  const isNotTheEnd = step.some && step.val !== 'documentation'

  return (
    <div className="fixed inset-0 z-30 bg-black/30 dark:bg-black/50">
      <TutorialArrows onBack={onBack} onNext={onNext} />

      {isNotTheEnd && (
        <Button.Root
          className="fixed left-4 top-4 z-50"
          onClick={() => {
            skip('skip')
          }}
        >
          {t('common.skip')}
          <Button.Icon edge="end">
            <XMarkIcon className="h-5 w-5" />
          </Button.Icon>
        </Button.Root>
      )}
    </div>
  )
}

export default TutorialBackdrop
