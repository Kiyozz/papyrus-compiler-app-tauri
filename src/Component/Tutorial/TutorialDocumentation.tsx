/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { useTutorial } from 'App/Hook/UseTutorial'
import { useNavigate } from 'react-router-dom'

const TutorialDocumentation = () => {
  const navigate = useNavigate()
  const { changeStep, scrollInto } = useTutorial()
  const { clear } = useCompilationScripts()

  return (
    <TutorialBackdrop
      tutorialRef="documentation"
      onBack={() => {
        changeStep('compilation-create-group-from-scripts-list')
        scrollInto('compilation-create-group-from-scripts-list')
      }}
      onNext={() => {
        changeStep('end')
        clear()
        navigate('/settings')
      }}
    />
  )
}

export default TutorialDocumentation
