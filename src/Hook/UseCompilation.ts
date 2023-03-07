/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateRecentScripts } from 'App/Hook/RecentScripts/UseUpdateRecentScripts'
import { useCompilationScripts } from 'App/Hook/UseCompilationScripts'
import { useCompile } from 'App/Hook/useCompile'
import { type CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { createLogs } from 'App/Lib/CreateLog'
import { isBusy, isRunning } from 'App/Lib/FileScriptCompilation'
import { RA } from 'App/Lib/FpTs'
import { useCallback } from 'react'
import invariant from 'tiny-invariant'
import { Err, Ok, Result } from 'ts-results'

const logs = createLogs('useCompilation')

export function useCompilation() {
  const { data } = useConf()
  const updateRecentScripts = useUpdateRecentScripts()
  const { add, scripts, remove, replace } = useCompilationScripts()
  const { add: addCompilationLog } = useCompilationLogs()
  const compileMutation = useCompile()

  const compile = useCallback(
    async (scripts: FileScriptCompilation[]) => {
      const concurrentScripts = data?.compilation?.concurrentScripts
      invariant(concurrentScripts, 'concurrentScripts is not defined')
      logs.trace('compile', scripts)()

      // Mark all scripts as busy
      for (const script of scripts) {
        replace({
          ...script,
          status: 'busy',
        })
      }

      // Chunk scripts from concurrentScripts value
      const chunkedScripts = RA.chunksOf(concurrentScripts)(scripts)
      const compileRes = [] as Array<Result<CompilationLog, Error>>

      // Compile each scripts in chunk in parallel
      for (const chunk of chunkedScripts) {
        const res = await Promise.all(
          chunk.map(async (script) => {
            // Mark script as running
            replace({
              ...script,
              status: 'running',
            })

            logs.trace('start compile', script)()

            const res = (await Result.wrapAsync(async () => await compileMutation.mutateAsync(script))).mapErr(
              (reason) => new Error(`failed to compile script ${script.name}. error given: ${reason}`),
            )

            if (res.err) {
              const err = res.val
              logs.error('error compile script', script, err)()
              console.error('compile', err)

              replace({
                ...script,
                status: 'error',
              })

              return Err(err)
            } else {
              const log = res.val
              replace({
                ...script,
                status: log.status === 'error' ? 'error' : 'done',
              })

              logs.trace('add compilation log', log)()

              addCompilationLog(log)

              return Ok(log)
            }
          }),
        )

        compileRes.push(...res)
      }

      const compilationLogs = compileRes.filter((r) => r.ok).map((r) => (r.val as CompilationLog).script.path)

      logs.trace('add scripts to recent scripts', compilationLogs)()

      const updateRes = (
        await Result.wrapAsync(async () => {
          await updateRecentScripts.mutateAsync({
            recentScripts: compilationLogs,
          })
        })
      ).mapErr((reason) => new Error(`failed to update recent scripts: ${reason}`))

      if (updateRes.err) {
        logs.error('error update recent scripts', updateRes.val)()

        console.error('failed to update recent scripts', updateRes)
      }
    },
    [addCompilationLog, compileMutation, data?.compilation?.concurrentScripts, replace, updateRecentScripts],
  )

  return {
    scripts,
    add,
    remove,
    clear: () => {
      const scriptsToRemove = scripts.filter((script) => !isRunning(script) && !isBusy(script))
      remove(scriptsToRemove)
    },
    compile,
  }
}
