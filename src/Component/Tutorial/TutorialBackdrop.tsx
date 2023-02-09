/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CloseIcon from '@mui/icons-material/Close'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import TutorialArrows from 'App/Component/Tutorial/TutorialArrows'
import { TutorialRefs, useTutorial } from 'App/Hook/UseTutorial'
import { isSome } from 'App/Lib/FpTs'
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
  const { scrollInto, skip, step } = useTutorial()
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
  }, [])

  return (
    <Backdrop open className="items-end pb-6" timeout={{ enter: 0 }}>
      <TutorialArrows onBack={onBack} onNext={onNext} />
      {isSome(step) && step.value !== 'documentation' && (
        <Button
          className="fixed top-4 left-4 z-50"
          variant="contained"
          color="info"
          onClick={skip}
          endIcon={<CloseIcon />}
        >
          {t('common.skip')}
        </Button>
      )}
    </Backdrop>
  )
}

export default TutorialBackdrop
