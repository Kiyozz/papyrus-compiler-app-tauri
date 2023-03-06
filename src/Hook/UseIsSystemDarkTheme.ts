/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/Conf/UseConf'
import { useSystemDarkPreference } from 'App/Hook/UseSystemDarkPreference'
import { fromNullable } from 'App/Lib/TsResults'

export const useIsSystemDarkTheme = () => {
  const isDark = useSystemDarkPreference()
  const conf = useConf()

  return fromNullable(conf.data)
    .map(({ theme }) => (theme === 'system' ? isDark : theme === 'dark'))
    .unwrapOr(isDark)
}
