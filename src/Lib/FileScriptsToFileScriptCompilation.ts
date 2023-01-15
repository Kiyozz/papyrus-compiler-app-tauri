/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { FileScriptCompilation } from './Compilation/FileScriptCompilationDecoder'

export const fileScriptsToFileScriptCompilation = (scripts: FileScript[]) => {
  return scripts.map(
    (script) =>
      ({
        ...script,
        status: 'idle',
      } satisfies FileScriptCompilation),
  )
}
