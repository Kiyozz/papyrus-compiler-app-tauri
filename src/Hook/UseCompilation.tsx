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
import { createErrorLog, createTraceLog } from 'App/Lib/CreateLog'
import { isRunning } from 'App/Lib/FileScriptCompilation'
import { A, pipe, RA, TE } from 'App/Lib/FpTs'
import { useCallback } from 'react'

const traceLog = createTraceLog('useCompilation')
const errorLog = createErrorLog('useCompilation')

export function useCompilation() {
  const updateRecentScripts = useUpdateRecentScripts()

  const { add, scripts, remove, replace } = useCompilationScripts()
  const { add: addCompilationLog } = useCompilationLogs()
  const compileMutation = useCompile()
  const compile = useCallback(async (scripts: FileScriptCompilation[]) => {
    void traceLog('compile', scripts)()

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

                traceLog('start compile', script)()

                return compileMutation.mutateAsync(script)
              },
              (reason) => {
                return new Error(`failed to compile script ${script.name}. error given: ${reason}`)
              },
            ),
            TE.mapLeft((reason) => {
              errorLog('error compile script', script, reason)()
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

              traceLog('add compilation log', log)()

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
            traceLog(
              'add scripts to recent scripts',
              logs.map((l) => l.script),
            )()

            return updateRecentScripts.mutateAsync({
              recentScripts: pipe(logs, RA.toArray).map((log) => log.script.path),
            })
          },
          (reason) => {
            errorLog('error update recent scripts', reason)()

            return new Error(`failed to update recent scripts: ${reason}`)
          },
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
