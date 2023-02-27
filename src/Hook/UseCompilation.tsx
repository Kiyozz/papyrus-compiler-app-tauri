/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useUpdateRecentScripts } from 'App/Hook/RecentScripts/UseUpdateRecentScripts'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { useCompile } from 'App/Hook/useCompile'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { isRunning } from 'App/Lib/FileScriptCompilation'
import { A, pipe, RA, TE } from 'App/Lib/FpTs'
import { useCallback } from 'react'

export function useCompilation() {
  const updateRecentScripts = useUpdateRecentScripts()

  const { add, scripts, remove, replace } = useCompilationScripts()
  const { add: addCompilationLog } = useCompilationLogs()
  const compileMutation = useCompile()
  const compile = useCallback(async (scripts: FileScriptCompilation[]) => {
    const res = await pipe(
      TE.sequenceArray(
        scripts.map((script) =>
          pipe(
            TE.tryCatch(
              () => {
                replace({
                  ...script,
                  status: 'running',
                })

                return compileMutation.mutateAsync(script)
              },
              (reason) => {
                return new Error(`failed to compile script ${script.name}. error given: ${reason}`)
              },
            ),
            TE.mapLeft((reason) => {
              console.error('compile', reason)

              replace({
                ...script,
                status: 'error',
              })

              return reason
            }),
            TE.map((log) => {
              replace({
                ...script,
                status: log.status === 'error' ? 'error' : 'done',
              })

              addCompilationLog(log)

              return log
            }),
          ),
        ),
      ),
    )

    return pipe(
      res,
      TE.chain((logs) => {
        return TE.tryCatch(
          () => {
            return updateRecentScripts.mutateAsync({
              recentScripts: pipe(logs, RA.toArray).map((log) => log.script.path),
            })
          },
          (reason) => new Error(`failed to update recent scripts: ${reason}`),
        )
      }),
    )()
  }, [])

  return {
    scripts,
    add,
    remove,
    clear: () => {
      pipe(
        scripts,
        A.filter((script) => !isRunning(script)),
        remove,
      )
    },
    compile,
  }
}
