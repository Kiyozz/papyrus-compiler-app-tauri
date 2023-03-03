/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScript, FileScriptDecoder } from 'App/Lib/Conf/ConfDecoder'
import { A, E, pipe } from 'App/Lib/FpTs'
import { isPscFile } from 'App/Lib/IsPscFile'
import { getLastPartOfPath } from 'App/Lib/Path'
import { v4 } from 'uuid'
import { D } from './IoTs'

export const pathsToFileScript = (paths: string[] | FileScript[]): FileScript[] =>
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
        return typeof path === 'string' ? { id: v4(), name: getLastPartOfPath(path), path } : path
      }),
    ),
    E.getOrElse(() => [] as FileScript[]),
  )
