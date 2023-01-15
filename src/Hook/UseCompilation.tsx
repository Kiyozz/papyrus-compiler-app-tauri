/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useCompile } from 'App/Hook/useCompile'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { O } from 'App/Lib/FpTs'
import { useCallback } from 'react'

export function useCompilation() {
  const { add, scripts, remove, clear, replace } = useScriptsList<FileScriptCompilation>({
    initialScripts: [],
  })
  const compileMutation = useCompile()
  const compile = useCallback(async (script: FileScriptCompilation) => {
    replace({
      ...script,
      status: 'running',
    })
    const compilationLogOpt = await compileMutation.mutateAsync(script)

    if (O.isNone(compilationLogOpt)) {
      replace({
        ...script,
        status: 'error',
      })

      return // if isNone, the compilation was not ready (config not loaded or invalid)
    }

    const compilationLog = compilationLogOpt.value

    if (compilationLog.status === 'error') {
      replace({
        ...script,
        status: 'error',
      })
    } else {
      replace({
        ...script,
        status: 'done',
      })
    }

    console.log(compilationLog)

    // handle add logs in app
  }, [])

  return {
    scripts,
    add,
    remove,
    clear,
    compile,
  }
}
