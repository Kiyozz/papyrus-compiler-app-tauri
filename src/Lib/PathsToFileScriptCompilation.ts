/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScript, FileScriptDecoder } from 'App/Lib/Conf/ConfDecoder'
import { A, E, pipe } from 'App/Lib/FpTs'
import { isPscFile } from 'App/Lib/IsPscFile'
import { getLastPartOfPath } from 'App/Lib/Path'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { v4 } from 'uuid'
import { D } from './IoTs'

export const pathsToFileScriptCompilation = (paths: string[] | FileScript[]): FileScriptCompilation[] =>
  pipe(
    D.array(D.union(D.string, FileScriptDecoder)).decode(paths),
    E.map((paths) =>
      pipe(
        paths,
        A.filter((path) => isPscFile(typeof path === 'string' ? path : path.path)),
      ),
    ),
    E.map(
      A.map((path) => {
        const base = typeof path === 'string' ? { id: v4(), name: getLastPartOfPath(path), path } : path

        return {
          ...base,
          status: 'idle',
        } satisfies FileScriptCompilation
      }),
    ),
    E.getOrElse(() => [] as FileScriptCompilation[]),
  )
