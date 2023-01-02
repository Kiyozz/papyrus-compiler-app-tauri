/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { Conf } from 'App/Service/Conf/ConfDecoder'
import { stringJson } from 'App/Service/Json'
import { TE, pipe } from 'App/Util/FpTs'

export const writeConfigFile = (path: string) => (contents: Conf) =>
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
