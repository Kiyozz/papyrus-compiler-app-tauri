/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameType } from 'App/Service/Conf/ConfDecoder'
import { SettingsDefaultScript } from 'App/Type/Settings/SettingsDefaultScript'

export const toDefaultScript = (game: GameType): SettingsDefaultScript => {
  switch (game) {
    case 'Fallout 4':
      return 'Base/Actor.psc'
    default:
      return 'Actor.psc'
  }
}
