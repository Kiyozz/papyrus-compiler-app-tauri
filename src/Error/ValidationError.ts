/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export class ValidationError<T> extends Error {
  constructor(value: T) {
    super(`ValidationError: ${value?.toString() ?? 'unknown value'}`)
  }
}
