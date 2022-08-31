/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 */

import { useIsSystemDarkTheme } from 'App/Hook/UseIsSystemDarkTheme'
import { useEffect } from 'react'

export const useSyncHtmlTheme = (): void => {
  const isDark = useIsSystemDarkTheme()

  useEffect(() => {
    const list = (document.getElementById('root') as HTMLDivElement).classList

    if (isDark) {
      list.add('dark')
    } else {
      list.remove('dark')
    }
  }, [isDark])
}
