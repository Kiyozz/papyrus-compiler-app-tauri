/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { A, E, pipe } from 'App/Lib/FpTs'
import { isPscFile } from 'App/Lib/IsPscFile'
import { getLastPartOfPath } from 'App/Lib/Path'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { v4 } from 'uuid'
import { D } from './IoTs'

export const pathsToFileScriptCompilation = (paths: string[]): FileScriptCompilation[] =>
  pipe(
    D.array(D.string).decode(paths),
    E.map((path) => pipe(path, A.filter(isPscFile))),
    E.map(
      A.map(
        (path) =>
          ({
            path,
            name: getLastPartOfPath(path),
            id: v4(),
            status: 'idle',
          } satisfies FileScriptCompilation),
      ),
    ),
    E.getOrElse(() => [] as FileScriptCompilation[]),
  )
