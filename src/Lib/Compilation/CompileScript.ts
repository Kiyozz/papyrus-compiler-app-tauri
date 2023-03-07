/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { invokeCompileScript } from 'App/Lib/InvokeCompileScript'
import { Ok, type Result } from 'ts-results'
import { type CompilationLog } from './CompilationLog'

export const compileScript = async (
  conf: Conf,
  script: FileScriptCompilation,
): Promise<Result<CompilationLog, Error>> => {
  const compileCommand = await invokeCompileScript(
    conf.compilation.compilerPath,
    [], // TODO: add args, with mo2 support
    script.path,
    'compileScript',
  )

  if (compileCommand.err) return compileCommand

  return Ok({
    script,
    status: compileCommand.val === 'Succeeded' ? 'success' : 'error',
    output: compileCommand.val.replace(/Batch compile of \d+ files finished\. \d+ failed\./, ''),
  })
}
