/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type TutorialRefs, type TutorialStep, useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollFromStep(toRef: keyof TutorialRefs, checkFromStep: TutorialStep, fromPathname = '/') {
  const { state, pathname } = useLocation()
  const { scrollInto } = useSettingsTutorial()

  const fromStep = (state as { fromStep: TutorialStep } | null)?.fromStep ?? null

  useEffect(() => {
    if (fromStep === checkFromStep && pathname === fromPathname) {
      scrollInto(toRef)
    }
  }, [checkFromStep, fromPathname, fromStep, pathname, scrollInto, toRef])
}
