/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { T } from 'App/Util/FpTs'

export const Console = {
  log:
    (...args: unknown[]): T.Task<void> =>
    () => {
      console.log(...args)

      return Promise.resolve()
    },
  error:
    (...args: unknown[]): T.Task<void> =>
    () => {
      console.error(...args)

      return Promise.resolve()
    },
  warn:
    (...args: unknown[]): T.Task<void> =>
    () => {
      console.warn(...args)

      return Promise.resolve()
    },
}
