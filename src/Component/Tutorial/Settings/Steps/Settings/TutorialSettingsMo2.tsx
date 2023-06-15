/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useScrollFromStep } from 'App/Hook/Tutorial/UseScrollFromStep'
import { type TutorialStep, useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useNavigate } from 'react-router-dom'

const TutorialSettingsMo2 = () => {
  const navigate = useNavigate()
  const { changeStep, scrollInto } = useSettingsTutorial()

  useScrollFromStep('settings-mo2', 'compilation-add-scripts', '/settings')

  return (
    <TutorialBackdrop
      tutorialRef="settings-mo2"
      onBack={() => {
        changeStep('settings-concurrent')
        scrollInto('settings-concurrent')
      }}
      onNext={() => {
        const state: { fromStep: TutorialStep } = { fromStep: 'settings-mo2' }

        navigate('/', { state })
        changeStep('compilation-add-scripts')
      }}
    />
  )
}

export default TutorialSettingsMo2
