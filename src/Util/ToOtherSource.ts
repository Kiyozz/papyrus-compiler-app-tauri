/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSourceEnum } from 'App/Enum/GameSourceEnum'
import { GameTypeEnum } from 'App/Enum/GameTypeEnum'

export const toOtherSource = (game: GameTypeEnum): GameSourceEnum => {
  switch (game) {
    case GameTypeEnum.le:
    case GameTypeEnum.fo4:
      return GameSourceEnum.sourceFirst
    case GameTypeEnum.se:
    case GameTypeEnum.vr:
      return GameSourceEnum.scriptsFirst
    default:
      throw new Error('RuntimeError: unsupported GameType')
  }
}
