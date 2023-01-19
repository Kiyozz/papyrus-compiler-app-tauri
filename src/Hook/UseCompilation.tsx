/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useUpdateRecentScripts } from 'App/Hook/RecentScripts/UseUpdateRecentScripts'
import { useCompile } from 'App/Hook/useCompile'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { A, E, isLeft, O, pipe, RA, TE } from 'App/Lib/FpTs'
import { useCallback } from 'react'

export function useCompilation() {
  const updateRecentScripts = useUpdateRecentScripts()

  const { add, scripts, remove, clear, replace } = useScriptsList<FileScriptCompilation>({
    initialScripts: [],
  })
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
                return new Error(`failed to compile script ${script.name}: ${reason}`)
              },
            ),
            TE.map((opt) => {
              return pipe(
                opt,
                O.fold(
                  () => {
                    replace({
                      ...script,
                      status: 'error',
                    })

                    return O.none
                  },
                  (log) => {
                    if (log.status === 'error') {
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

                    return O.some(log)
                  },
                ),
              )
            }),
          ),
        ),
      ),
    )()

    await pipe(
      res,
      E.fold(
        async (err) => console.error(err),
        async (logs) => {
          const res = await TE.tryCatch(
            () => {
              return updateRecentScripts.mutateAsync(A.compact(pipe(logs, RA.toArray)).map((log) => log.script.path))
            },
            (reason) => new Error(`failed to update recent scripts: ${reason}`),
          )()

          if (isLeft(res)) {
            console.error(res.left)
          }
        },
      ),
    )

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
