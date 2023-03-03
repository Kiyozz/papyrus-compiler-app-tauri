/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { type Groups } from 'App/Lib/Conf/ConfDecoder'
import { stringify } from 'App/Lib/Json'
import { TE, pipe } from 'App/Lib/FpTs'

export const writeGroupsFile = (path: string) => (contents: Groups) =>
  pipe(
    contents,
    stringify,
    TE.fromEither,
    TE.chainW((json) =>
      TE.tryCatch(
        async () => { await writeTextFile({ path, contents: json }, { dir: BaseDirectory.App }); },
        (reason) => new Error(`Cannot write groups file, error given: ${reason}`),
      ),
    ),
  )
