/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { flow, TE, T } from 'App/Lib/FpTs'
import { parseAndDecodeRecentScripts } from 'App/Lib/RecentScripts/Json'

export const readRecentScriptsFile = (path: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    () => readTextFile(path, { dir: BaseDirectory.App }),
    (reason) => new Error(`Cannot read recent scripts file, error given: ${reason}`),
  )

export const canReadRecentScriptsFile =
  (path: string): T.Task<boolean> =>
  () =>
    exists(path, { dir: BaseDirectory.App })

export const readRecentScriptsFileJson = flow(readRecentScriptsFile, TE.chainEitherKW(parseAndDecodeRecentScripts))
