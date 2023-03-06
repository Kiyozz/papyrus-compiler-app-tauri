/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'

export const fileScriptsCompilationToFileScripts = (scripts: FileScriptCompilation[]) => {
  return scripts.map(({ status, ...script }) => script satisfies FileScript)
}
