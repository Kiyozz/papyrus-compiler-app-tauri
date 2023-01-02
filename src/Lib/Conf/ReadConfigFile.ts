/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { parseJsonConf } from 'App/Lib/Conf/Json'
import { flow, TE, T } from 'App/Lib/FpTs'

export const readConfigFile = (path: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    () => readTextFile(path, { dir: BaseDirectory.App }),
    (reason) => new Error(`Cannot read config file, error given: ${reason}`),
  )

export const canReadConfigFile =
  (path: string): T.Task<boolean> =>
  () =>
    exists(path, { dir: BaseDirectory.App })

export const readConfigFileJson = flow(readConfigFile, TE.chainEitherKW(parseJsonConf))
