/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { isDark, onDarkPreferenceChanges } from 'App/Lib/Dark'
import { useEffect, useState } from 'react'

export const useSystemDarkPreference = (): boolean => {
  const [isUsingDark, setDark] = useState(isDark)

  useEffect(() => {
    const unsubscribe = onDarkPreferenceChanges((matches) => setDark(matches))

    return () => unsubscribe()
  }, [])

  return isUsingDark
}
