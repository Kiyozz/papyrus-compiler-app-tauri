/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { type CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCompilationLogsStore = create(
  combine(
    {
      logs: [] as CompilationLog[],
    },
    (set) => ({
      add: (log: CompilationLog) => {
        set((state) => ({
          logs: [...state.logs, log],
        }))
      },
      remove: (script: FileScriptCompilation) => {
        set((state) => ({
          logs: state.logs.filter((log) => log.script.id !== script.id),
        }))
      },
      clear: () => {
        set({
          logs: [],
        })
      },
    }),
  ),
)

export const compilationLogsStoreComputed = {
  get hasAnyError() {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- false positive
    return useCompilationLogsStore((state) => state.logs.some((log) => log.status === 'error'))
  },
  get hasAllSuccess() {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- false positive
    return useCompilationLogsStore(
      (state) => is.nonEmptyArray(state.logs) && state.logs.every((log) => log.status === 'success'),
    )
  },
}
