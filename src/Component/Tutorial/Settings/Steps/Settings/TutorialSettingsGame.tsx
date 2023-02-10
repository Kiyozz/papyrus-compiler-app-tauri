/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'

const TutorialSettingsGame = () => {
  const { changeStep, scrollInto } = useSettingsTutorial()

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
