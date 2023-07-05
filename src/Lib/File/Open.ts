/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open } from '@tauri-apps/api/shell'
import { Result } from 'ts-results'

function createOpen(errorMessage: string) {
  return async function (fileOrUrl: string) {
    return (
      await Result.wrapAsync(async () => {
        await open(fileOrUrl)
      })
    ).mapErr((reason) => new Error(`${errorMessage}: "${fileOrUrl}"`, { cause: reason }))
  }
}

export const openFile = createOpen('Cannot open file')
export const openUrl = createOpen('Cannot open url')
