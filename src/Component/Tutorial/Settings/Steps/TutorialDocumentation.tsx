/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useNavigate } from 'react-router-dom'

const TutorialDocumentation = () => {
  const navigate = useNavigate()
  const { changeStep, scrollInto, skip } = useSettingsTutorial()
  const { clear } = useCompilationScripts()

  return (
    <TutorialBackdrop
      tutorialRef="documentation"
      onBack={() => {
        changeStep('compilation-create-group-from-scripts-list')
        scrollInto('compilation-create-group-from-scripts-list')
      }}
      onNext={() => {
        navigate('/settings')
        skip()
        clear()
      }}
    />
  )
}

export default TutorialDocumentation
