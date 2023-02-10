/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialBackdrop from 'App/Component/Tutorial/TutorialBackdrop'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { useTutorial } from 'App/Hook/UseTutorial'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TutorialCompilationAddScripts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { changeStep, scrollInto } = useTutorial()
  const { add } = useCompilationScripts()

  // When go back, change to mo2 and focus it
  useEffect(() => {
    if (location.pathname === '/settings') {
      changeStep('settings-mo2')
      scrollInto('settings-mo2')
    }
  }, [location])

  return (
    <TutorialBackdrop
      tutorialRef="compilation-add-scripts"
      onBack={() => {
        navigate('/settings')
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
