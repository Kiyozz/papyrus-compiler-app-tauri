/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export class FsError extends Error {
  constructor(err: unknown) {
    super(err?.toString() ?? 'unknown error')
  }
}
