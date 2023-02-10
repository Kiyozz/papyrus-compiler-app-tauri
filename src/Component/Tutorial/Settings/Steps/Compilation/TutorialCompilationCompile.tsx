/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'

const TutorialCompilationCompile = () => {
  const { changeStep, scrollInto } = useSettingsTutorial()
  const { clear } = useCompilationScripts()

  return (
    <TutorialBackdrop
      tutorialRef="compilation-compile"
      onBack={() => {
        changeStep('compilation-add-scripts')
        scrollInto('compilation-add-scripts')
        clear()
      }}
      onNext={() => {
        changeStep('compilation-create-group-from-scripts-list')
        scrollInto('compilation-create-group-from-scripts-list')
      }}
    />
  )
}

export default TutorialCompilationCompile
