/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useTutorial } from 'App/Hook/UseTutorial'

const TutorialCompilationAddGroupFromScriptsList = () => {
  const { changeStep, scrollInto } = useTutorial()

  return (
    <TutorialBackdrop
      tutorialRef="compilation-create-group-from-scripts-list"
      onBack={() => {
        changeStep('compilation-compile')
        scrollInto('compilation-compile')
      }}
      onNext={() => {
        changeStep('documentation')
        scrollInto('documentation')
      }}
    />
  )
}

export default TutorialCompilationAddGroupFromScriptsList
