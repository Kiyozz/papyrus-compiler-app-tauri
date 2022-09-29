/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { GameType } from 'App/Enum/GameType'

export function validationGameType(gameType: unknown): gameType is GameType {
  if (is.undefined(gameType)) return false

  if (is.string(gameType)) {
    switch (gameType) {
      case GameType.le:
      case GameType.se:
      case GameType.vr:
      case GameType.fo4:
        return true
    }
  }

  return false
}

export function validationGamePath(path: unknown): path is string {
  return is.nonEmptyStringAndNotWhitespace(path)
}
