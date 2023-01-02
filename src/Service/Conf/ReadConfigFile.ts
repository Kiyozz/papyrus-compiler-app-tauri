/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import { parseJsonConf } from 'App/Service/Json'
import { flow, TE } from 'App/Util/FpTs'

export const readConfigFile = <T>(path: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    () => readTextFile(path, { dir: BaseDirectory.App }),
    (reason) => new Error(`Cannot read config file, error given: ${reason}`),
  )

export const readConfigFileJson = flow(readConfigFile, TE.chainEitherKW(parseJsonConf))
