/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useTutorial } from 'App/Hook/UseTutorial'

const TutorialSettingsConcurrent = () => {
  const { changeStep, scrollInto } = useTutorial()

  return (
    <TutorialBackdrop
      tutorialRef="settings-concurrent"
      onBack={() => {
        changeStep('settings-compiler')
        scrollInto('settings-compiler')
      }}
      onNext={() => {
        changeStep('settings-mo2')
        scrollInto('settings-mo2')
      }}
    />
  )
}

export default TutorialSettingsConcurrent
