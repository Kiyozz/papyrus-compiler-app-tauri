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
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { createLogs } from 'App/Lib/CreateLog'
import { isRunning } from 'App/Lib/FileScriptCompilation'
import { A, pipe, RA, TE } from 'App/Lib/FpTs'
import { useCallback } from 'react'

const logs = createLogs('useCompilation')

export function useCompilation() {
  const updateRecentScripts = useUpdateRecentScripts()

  const { add, scripts, remove, replace } = useCompilationScripts()
  const { add: addCompilationLog } = useCompilationLogs()
  const compileMutation = useCompile()
  const compile = useCallback(
    async (scripts: FileScriptCompilation[]) => {
      void logs.trace('compile', scripts)()

      const res = pipe(
        TE.sequenceArray(
          scripts.map((script) =>
            pipe(
              TE.tryCatch(
                async () => {
                  replace({
                    ...script,
                    status: 'running',
                  })

                  void logs.trace('start compile', script)()

                  return await compileMutation.mutateAsync(script)
                },
                (reason) => {
                  return new Error(`failed to compile script ${script.name}. error given: ${reason}`)
                },
              ),
              TE.mapLeft((reason) => {
                void logs.error('error compile script', script, reason)()
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

                void logs.trace('add compilation log', log)()

                addCompilationLog(log)

                return log
              }),
            ),
          ),
        ),
      )

      return await pipe(
        res,
        TE.chain((compilationLogs) => {
          return TE.tryCatch(
            async () => {
              void logs.trace(
                'add scripts to recent scripts',
                compilationLogs.map((l) => l.script),
              )()

              await updateRecentScripts.mutateAsync({
                recentScripts: pipe(compilationLogs, RA.toArray).map((log) => log.script.path),
              })
            },
            (reason) => {
              void logs.error('error update recent scripts', reason)()

              return new Error(`failed to update recent scripts: ${reason}`)
            },
          )
        }),
      )()
    },
    [addCompilationLog, compileMutation, replace, updateRecentScripts],
  )

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
