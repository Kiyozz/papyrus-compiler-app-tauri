/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSourceEnum } from 'App/Enum/GameSourceEnum'
import { GameTypeEnum } from 'App/Enum/GameTypeEnum'

export const toSource = (game: GameTypeEnum): GameSourceEnum => {
  switch (game) {
    case GameTypeEnum.le:
    case GameTypeEnum.fo4:
      return GameSourceEnum.scriptsFirst
    case GameTypeEnum.se:
    case GameTypeEnum.vr:
      return GameSourceEnum.sourceFirst
    default:
      throw new TypeError('RuntimeError: unsupported GameType')
  }
}
