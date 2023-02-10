/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { isNone } from 'App/Lib/FpTs'

const TutorialArrows = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const { total, step } = useSettingsTutorial()

  return (
    <>
      <Button
        variant="contained"
        disabled={isNone(step) || step.value === 'settings-game'}
        className="fixed left-4 top-1/2 min-w-fit -translate-y-1/2 p-2"
        onClick={onBack}
      >
        <ArrowBackIcon />
      </Button>
      <Button variant="contained" className="fixed right-4 top-1/2 min-w-fit -translate-y-1/2 p-2" onClick={onNext}>
        {isNone(step) || step.value !== 'documentation' ? <ArrowForwardIcon /> : <CloseIcon />}
      </Button>
      <div className="mt-4 flex justify-center text-xl">
        {total.current}/{total.end}
      </div>
    </>
  )
}

export default TutorialArrows
