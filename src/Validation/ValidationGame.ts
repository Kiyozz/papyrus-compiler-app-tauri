/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { type GameType, type Game } from 'App/Lib/Conf/ConfZod'

export function validationGameType(gameType: unknown): gameType is GameType {
  if (is.undefined(gameType)) return false

  if (is.string(gameType)) {
    switch (gameType) {
      case 'Skyrim LE':
      case 'Skyrim SE/AE':
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
