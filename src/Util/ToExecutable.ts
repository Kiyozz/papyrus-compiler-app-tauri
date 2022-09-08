/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameExecutableEnum } from 'App/Enum/GameExecutableEnum'
import { GameTypeEnum } from 'App/Enum/GameTypeEnum'

export function toExecutable(game: GameTypeEnum): GameExecutableEnum {
  switch (game) {
    case GameTypeEnum.le:
      return GameExecutableEnum.le
    case GameTypeEnum.se:
      return GameExecutableEnum.se
    case GameTypeEnum.vr:
      return GameExecutableEnum.vr
    case GameTypeEnum.fo4:
      return GameExecutableEnum.fo4
    default:
      throw new TypeError('RuntimeError: unsupported GameType')
  }
}
