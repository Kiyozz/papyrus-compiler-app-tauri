/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSource } from 'App/Enum/GameSource'
import { GameType } from 'App/Enum/GameType'

export const toOtherSource = (game: GameType): GameSource => {
  switch (game) {
    case GameType.le:
    case GameType.fo4:
      return GameSource.sourceFirst
    case GameType.se:
    case GameType.vr:
      return GameSource.scriptsFirst
    default:
      throw new Error('RuntimeError: unsupported GameType')
  }
}
