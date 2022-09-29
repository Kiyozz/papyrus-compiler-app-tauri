/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'

export function validationCompilerPath(path: unknown): path is string {
  return is.nonEmptyStringAndNotWhitespace(path)
}

export function validationOutputPath(path: unknown): path is string {
  return is.nonEmptyStringAndNotWhitespace(path)
}
