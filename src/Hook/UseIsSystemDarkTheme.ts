/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useApp } from 'App/Hook/UseApp'
import { useSystemDarkPreference } from 'App/Hook/UseSystemDarkPreference'

export const useIsSystemDarkTheme = () => {
  const isDark = useSystemDarkPreference()
  const {
    dark: [theme],
  } = useApp()

  return theme === 'system' ? isDark : theme === 'dark'
}
