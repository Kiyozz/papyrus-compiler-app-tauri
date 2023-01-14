/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { parseJsonGroups } from 'App/Lib/Group/Json'
import { flow, TE, T } from 'App/Lib/FpTs'

export const readGroupsFile = (path: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    () => readTextFile(path, { dir: BaseDirectory.App }),
    (reason) => new Error(`Cannot read groups file, error given: ${reason}`),
  )

export const canReadGroupsFile =
  (path: string): T.Task<boolean> =>
  () =>
    exists(path, { dir: BaseDirectory.App })

export const readGroupsFileJson = flow(readGroupsFile, TE.chainEitherKW(parseJsonGroups))
