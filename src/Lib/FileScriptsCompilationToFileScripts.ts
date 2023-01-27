/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'

export const fileScriptsCompilationToFileScripts = (scripts: FileScriptCompilation[]) => {
  return scripts.map(({ status, ...script }) => script satisfies FileScript)
}
