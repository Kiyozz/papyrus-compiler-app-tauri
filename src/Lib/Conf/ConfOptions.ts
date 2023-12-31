/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export interface ConfOptions<T = unknown> {
  readonly projectVersion: string
  readonly confName: string
  readonly defaults: T
  readonly migrations?: any
}
