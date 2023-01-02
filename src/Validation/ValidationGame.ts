/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { GameType, Game } from 'App/Service/Conf/ConfDecoder'

export function validationGameType(gameType: unknown): gameType is GameType {
  if (is.undefined(gameType)) return false

  if (is.string(gameType)) {
    switch (gameType) {
      case 'Skyrim LE':
      case 'Skyrim SE':
      case 'Skyrim VR':
      case 'Fallout 4':
        return true
    }
  }

  return false
}

export function validationGamePath(path: unknown): path is Game['path'] {
  return is.nonEmptyStringAndNotWhitespace(path)
}
