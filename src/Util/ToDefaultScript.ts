/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameTypeEnum } from 'App/Enum/GameTypeEnum'
import { SettingsDefaultScript } from 'App/Type/Settings/SettingsDefaultScript'

export const toDefaultScript = (game: GameTypeEnum): SettingsDefaultScript => {
  switch (game) {
    case GameTypeEnum.fo4:
      return 'Base/Actor.psc'
    default:
      return 'Actor.psc'
  }
}
