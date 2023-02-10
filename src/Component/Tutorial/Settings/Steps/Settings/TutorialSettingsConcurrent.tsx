/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'

const TutorialSettingsConcurrent = () => {
  const { changeStep, scrollInto } = useSettingsTutorial()

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
