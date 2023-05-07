/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { XMarkIcon } from '@heroicons/react/24/outline'
import TutorialArrows from 'App/Component/Tutorial/Settings/TutorialArrows'
import ButtonRoot from 'App/Component/UI/Button'
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

  return (
    <div className="fixed inset-0 z-30 bg-black/30">
      <TutorialArrows onBack={onBack} onNext={onNext} />
      {step.some && step.val !== 'documentation' && (
        <ButtonRoot
          className="fixed left-4 top-4 z-50"
          color="inherit"
          onClick={() => {
            skip('skip')
          }}
          endIcon={<XMarkIcon className="h-5 w-5" />}
        >
          {t('common.skip')}
        </ButtonRoot>
      )}
    </div>
  )
}

export default TutorialBackdrop
