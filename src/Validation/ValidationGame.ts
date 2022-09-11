/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { GameTypeEnum } from 'App/Enum/GameTypeEnum'

export function validationGameType(gameType: unknown): gameType is GameTypeEnum {
  if (is.undefined(gameType)) return false

  if (is.string(gameType)) {
    switch (gameType) {
      case GameTypeEnum.le:
      case GameTypeEnum.se:
      case GameTypeEnum.vr:
      case GameTypeEnum.fo4:
        return true
    }
  }

  return false
}

export function validationGamePath(path: unknown): path is string {
  return is.nonEmptyStringAndNotWhitespace(path)
}

export function validationCompilerPath(path: unknown): path is string {
  return is.nonEmptyStringAndNotWhitespace(path)
}

export function validationOutputPath(path: unknown): path is string {
  return is.nonEmptyStringAndNotWhitespace(path)
}
