/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameType } from 'App/Enum/GameType'
import { SettingsDefaultScript } from 'App/Type/Settings/SettingsDefaultScript'

export const toDefaultScript = (game: GameType): SettingsDefaultScript => {
  switch (game) {
    case GameType.fo4:
      return 'Base/Actor.psc'
    default:
      return 'Actor.psc'
  }
}
