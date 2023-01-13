/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScriptDecoder } from 'App/Lib/Conf/ConfDecoder'
import { pipe } from 'App/Lib/FpTs'
import { D } from '../IoTs'

export const FileScriptCompilationDecoder = pipe(
  FileScriptDecoder,
  D.intersect(
    D.struct({
      status: D.union(D.literal('idle'), D.literal('running'), D.literal('done'), D.literal('error')),
    }),
  ),
)

export type FileScriptCompilation = D.TypeOf<typeof FileScriptCompilationDecoder>
export type FileScriptCompilationStatus = FileScriptCompilation['status']
