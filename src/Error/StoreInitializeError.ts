/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export class StoreInitializeError extends Error {
  constructor(err: unknown) {
    super(`cannot initialize store: ${err?.toString() ?? 'unknown error'}`)
  }
}
