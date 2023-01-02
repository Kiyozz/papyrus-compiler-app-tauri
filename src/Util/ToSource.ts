/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSource } from 'App/Enum/GameSource'
import { GameType } from 'App/Lib/Conf/ConfDecoder'

export const toSource = (game: GameType): GameSource => {
  switch (game) {
    case 'Skyrim LE':
    case 'Fallout 4':
      return GameSource.scriptsFirst
    case 'Skyrim SE':
    case 'Skyrim VR':
      return GameSource.sourceFirst
    default:
      throw new TypeError('RuntimeError: unsupported GameType')
  }
}
