/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useCompilationScriptsStore } from 'App/Hook/UseCompilationScriptsStore'
import { useNavigate } from 'react-router-dom'

const TutorialDocumentation = () => {
  const navigate = useNavigate()
  const { changeStep, scrollInto, skip } = useSettingsTutorial()
  const { clear } = useCompilationScriptsStore()

  return (
    <TutorialBackdrop
      tutorialRef="documentation"
      onBack={() => {
        changeStep('compilation-create-group-from-scripts-list')
        scrollInto('compilation-create-group-from-scripts-list')
      }}
      onNext={() => {
        navigate('/settings')
        skip('end')
        clear()
      }}
    />
  )
}

export default TutorialDocumentation
