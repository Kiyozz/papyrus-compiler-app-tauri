/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'

const TutorialSettingsCompiler = () => {
  const { changeStep, scrollInto } = useSettingsTutorial()

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
