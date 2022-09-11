/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { SettingsFlag } from 'App/Type/Settings/SettingsFlag'

export type SettingsCompilation = {
  concurrentScripts: number
  compilerPath: string
  flag: SettingsFlag
  output: string
}
