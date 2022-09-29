/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSource } from 'App/Enum/GameSource'
import { GameType } from 'App/Enum/GameType'

export const toSource = (game: GameType): GameSource => {
  switch (game) {
    case GameType.le:
    case GameType.fo4:
      return GameSource.scriptsFirst
    case GameType.se:
    case GameType.vr:
      return GameSource.sourceFirst
    default:
      throw new TypeError('RuntimeError: unsupported GameType')
  }
}
