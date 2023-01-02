/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Theme } from 'App/Enum/Theme'
import { SettingsCompilation } from 'App/Type/Settings/SettingsCompilation'
import { SettingsGame } from 'App/Type/Settings/SettingsGame'
import { SettingsLocale } from 'App/Type/Settings/SettingsLocale'
import { SettingsMo2 } from 'App/Type/Settings/SettingsMo2'
import { SettingsTelemetry } from 'App/Type/Settings/SettingsTelemetry'
import { SettingsTutorial } from 'App/Type/Settings/SettingsTutorial'

export type Settings = {
  game: SettingsGame
  compilation: SettingsCompilation
  tutorial: SettingsTutorial
  mo2: SettingsMo2
  telemetry: SettingsTelemetry
  groups: unknown[]
  theme: Theme
  locale: SettingsLocale
}
