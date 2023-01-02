/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameExecutable } from 'App/Enum/GameExecutable'
import { GameType } from 'App/Service/Conf/ConfDecoder'

export function toExecutable(game: GameType): GameExecutable {
  switch (game) {
    case 'Skyrim LE':
      return GameExecutable.le
    case 'Skyrim SE':
      return GameExecutable.se
    case 'Skyrim VR':
      return GameExecutable.vr
    case 'Fallout 4':
      return GameExecutable.fo4
    default:
      throw new TypeError('RuntimeError: unsupported GameType')
  }
}
