/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/Conf/UseConf'
import { useSystemDarkPreference } from 'App/Hook/UseSystemDarkPreference'
import { O, pipe } from 'App/Util/FpTs'

export const useIsSystemDarkTheme = () => {
  const isDark = useSystemDarkPreference()
  const conf = useConf()

  return pipe(
    conf.data,
    O.fromNullable,
    O.bind('isSystem', ({ theme }) => O.some(theme === 'system')),
    O.map(({ isSystem, theme }) => (isSystem ? isDark : theme === 'dark')),
    O.getOrElse(() => isDark),
  )
}
