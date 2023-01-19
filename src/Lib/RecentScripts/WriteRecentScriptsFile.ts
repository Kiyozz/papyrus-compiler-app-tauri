/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { RecentScripts } from 'App/Lib/Conf/ConfDecoder'
import { stringify } from 'App/Lib/Json'
import { TE, pipe } from 'App/Lib/FpTs'

export const writeRecentScriptsFile = (path: string) => (contents: RecentScripts) =>
  pipe(
    contents,
    stringify,
    TE.fromEither,
    TE.chainW((json) =>
      TE.tryCatch(
        () => writeTextFile({ path, contents: json }, { dir: BaseDirectory.App }),
        (reason) => new Error(`Cannot write recent scripts file, error given: ${reason}`),
      ),
    ),
  )
