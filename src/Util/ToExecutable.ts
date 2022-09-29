/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameExecutable } from 'App/Enum/GameExecutable'
import { GameType } from 'App/Enum/GameType'

export function toExecutable(game: GameType): GameExecutable {
  switch (game) {
    case GameType.le:
      return GameExecutable.le
    case GameType.se:
      return GameExecutable.se
    case GameType.vr:
      return GameExecutable.vr
    case GameType.fo4:
      return GameExecutable.fo4
    default:
      throw new TypeError('RuntimeError: unsupported GameType')
  }
}
