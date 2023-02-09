/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useTutorial } from 'App/Hook/UseTutorial'
import { useNavigate } from 'react-router-dom'

const TutorialSettingsMo2 = () => {
  const navigate = useNavigate()
  const { changeStep, scrollInto } = useTutorial()

  return (
    <TutorialBackdrop
      tutorialRef="settings-mo2"
      onBack={() => {
        changeStep('settings-concurrent')
        scrollInto('settings-concurrent')
      }}
      onNext={() => {
        navigate('/')
        changeStep('compilation-add-scripts')
      }}
    />
  )
}

export default TutorialSettingsMo2
