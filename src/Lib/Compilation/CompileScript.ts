/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { Conf } from 'App/Lib/Conf/ConfDecoder'
import { invokeCompileScript } from 'App/Lib/InvokeCompileScript'
import { E, TE } from '../FpTs'
import { CompilationLog } from './CompilationLog'

export const compileScript =
  (conf: Conf) =>
  (script: FileScriptCompilation): TE.TaskEither<Error, CompilationLog> => {
    return TE.tryCatch(
      async () => {
        // TODO: construct the args, with mo2 support
        const compileCommand = await invokeCompileScript(
          conf.compilation.compilerPath,
          [],
          script.path,
          'compileScript',
        )()

        if (E.isLeft(compileCommand)) {
          throw compileCommand.left
        }

        return {
          script,
          status: compileCommand.right.includes('0 failed') ? 'success' : 'error',
          output: compileCommand.right.replace(/Batch compile of \d+ files finished\. \d+ failed\./, ''),
        }
      },
      (reason) => new Error(`fatal error compile script, error given: ${reason}`),
    )
  }
