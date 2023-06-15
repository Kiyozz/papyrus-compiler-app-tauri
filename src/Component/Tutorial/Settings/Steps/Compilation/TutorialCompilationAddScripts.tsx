/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/Settings/TutorialBackdrop'
import { useScrollFromStep } from 'App/Hook/Tutorial/UseScrollFromStep'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { type TutorialStep, useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useNavigate } from 'react-router-dom'

const TutorialCompilationAddScripts = () => {
  const navigate = useNavigate()
  const { changeStep, scrollInto } = useSettingsTutorial()
  const { add } = useCompilationScripts()

  useScrollFromStep('compilation-add-scripts', 'settings-mo2')

  return (
    <TutorialBackdrop
      tutorialRef="compilation-add-scripts"
      onBack={() => {
        const state: { fromStep: TutorialStep } = { fromStep: 'compilation-add-scripts' }

        navigate('/settings', { state })
        changeStep('settings-mo2')
      }}
      onNext={() => {
        changeStep('compilation-compile')
        scrollInto('compilation-compile')
        add([
          {
            name: 'Actor.psc',
            path: '/Data/Source/Scripts/Actor.psc',
            status: 'idle',
            id: 'tutorial',
          },
        ])
      }}
    />
  )
}

export default TutorialCompilationAddScripts
