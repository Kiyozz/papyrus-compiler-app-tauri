/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameType } from 'App/Lib/Conf/ConfDecoder'
// import { SettingsDefaultScript } from 'App/Type/Settings/SettingsDefaultScript'

export const toDefaultScript = (game: GameType): string => {
  switch (game) {
    case 'Fallout 4':
      return 'Base/Actor.psc'
    default:
      return 'Actor.psc'
  }
}
