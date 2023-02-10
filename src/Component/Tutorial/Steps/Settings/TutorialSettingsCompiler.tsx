/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useTutorial } from 'App/Hook/UseTutorial'

const TutorialSettingsCompiler = () => {
  const { changeStep, scrollInto } = useTutorial()

  return (
    <TutorialBackdrop
      tutorialRef="settings-compiler"
      onBack={() => {
        changeStep('settings-game')
        scrollInto('settings-game')
      }}
      onNext={() => {
        changeStep('settings-concurrent')
        scrollInto('settings-concurrent')
      }}
    />
  )
}

export default TutorialSettingsCompiler
