/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { type FileScriptCompilation } from './Compilation/FileScriptCompilation'

export const fileScriptsToFileScriptCompilation = (scripts: FileScript[]) => {
  return scripts.map(
    (script) =>
      ({
        ...script,
        status: 'idle',
      } satisfies FileScriptCompilation),
  )
}
