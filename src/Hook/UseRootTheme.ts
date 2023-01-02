/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useIsSystemDarkTheme } from 'App/Hook/UseIsSystemDarkTheme'
import { useEffect } from 'react'

export const useRootTheme = (): void => {
  const isDark = useIsSystemDarkTheme()

  useEffect(() => {
    const list = (document.getElementById('root') as HTMLDivElement).classList

    if (isDark) {
      list.add('dark')
      document.documentElement.classList.add('dark')
    } else {
      list.remove('dark')
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])
}
