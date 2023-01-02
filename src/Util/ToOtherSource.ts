/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSource } from 'App/Enum/GameSource'
import { GameType } from 'App/Service/Conf/ConfDecoder'

export const toOtherSource = (game: GameType): GameSource => {
  switch (game) {
    case 'Skyrim LE':
    case 'Fallout 4':
      return GameSource.sourceFirst
    case 'Skyrim SE':
    case 'Skyrim VR':
      return GameSource.scriptsFirst
    default:
      throw new Error('RuntimeError: unsupported GameType')
  }
}
