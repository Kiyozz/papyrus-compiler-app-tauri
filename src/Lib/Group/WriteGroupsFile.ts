/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { Groups } from 'App/Lib/Conf/ConfDecoder'
import { stringJson } from 'App/Lib/Json'
import { TE, pipe } from 'App/Lib/FpTs'

export const writeGroupsFile = (path: string) => (contents: Groups) =>
  pipe(
    contents,
    stringJson,
    TE.fromEither,
    TE.chainW((json) =>
      TE.tryCatch(
        () => writeTextFile({ path, contents: json }, { dir: BaseDirectory.App }),
        (reason) => new Error(`Cannot write config file, error given: ${reason}`),
      ),
    ),
  )
