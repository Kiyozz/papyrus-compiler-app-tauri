/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useTutorial } from 'App/Hook/UseTutorial'

const TutorialSettingsGame = () => {
  const { changeStep, scrollInto } = useTutorial()

  return (
    <TutorialBackdrop
      tutorialRef="settings-game"
      onBack={() => {
        changeStep('welcome')
      }}
      onNext={() => {
        changeStep('settings-compiler')
        scrollInto('settings-compiler')
      }}
    />
  )
}

export default TutorialSettingsGame
