/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScript, FileScriptZod } from 'App/Lib/Conf/ConfZod'
import { isPscFile } from 'App/Lib/IsPscFile'
import { getLastPartOfPath } from 'App/Lib/Path'
import { v4 } from 'uuid'
import { z } from 'zod'
import { Result } from 'ts-results'

const PathsZod = z.union([z.string(), FileScriptZod]).array()

export const pathsToFileScriptAndFilterPscFile = (paths: string[] | FileScript[]): FileScript[] => {
  return Result.wrap(() => PathsZod.parse(paths))
    .map((paths) =>
      paths
        .filter((path) => isPscFile(typeof path === 'string' ? path : path.path))
        .map((path) => (typeof path === 'string' ? { id: v4(), name: getLastPartOfPath(path), path } : path)),
    )
    .unwrapOr([] as FileScript[])
}
