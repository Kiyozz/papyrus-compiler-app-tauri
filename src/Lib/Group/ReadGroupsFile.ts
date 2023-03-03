/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { parseAndDecodeGroups } from 'App/Lib/Group/Json'
import { flow, TE, type T } from 'App/Lib/FpTs'

export const readGroupsFile = (path: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    async () => await readTextFile(path, { dir: BaseDirectory.App }),
    (reason) => new Error(`Cannot read groups file, error given: ${reason}`),
  )

export const canReadGroupsFile =
  (path: string): T.Task<boolean> =>
  async () =>
    await exists(path, { dir: BaseDirectory.App })

export const readGroupsFileJson = flow(readGroupsFile, TE.chainEitherKW(parseAndDecodeGroups))
