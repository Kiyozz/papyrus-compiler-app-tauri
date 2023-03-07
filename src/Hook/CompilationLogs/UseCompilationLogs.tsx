/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { A } from 'App/Lib/FpTs'
import { createContext, type PropsWithChildren, useCallback, useContext, useReducer } from 'react'
import { match, P } from 'ts-pattern'

interface ContextShape {
  logs: CompilationLog[]
  add: (log: CompilationLog) => void
  remove: (script: FileScriptCompilation) => void
  clear: () => void
  hasAnyError: boolean
  hasAllSuccess: boolean
}

type Action =
  | {
      type: 'add'
      payload: CompilationLog
    }
  | {
      type: 'removeByScript'
      payload: FileScriptCompilation
    }
  | { type: 'clear' }

const reducer = (state: CompilationLog[], action: Action) => {
  return match(action)
    .with({ type: 'add', payload: P.select() }, (payload) => [...state, payload])
    .with({ type: 'removeByScript', payload: P.select() }, (payload) =>
      state.filter((log) => log.script.id !== payload.id),
    )
    .with({ type: 'clear' }, () => [])
    .exhaustive()
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const Context = createContext({} as ContextShape)

const CompilationLogsProvider = ({ children }: PropsWithChildren) => {
  const [logs, dispatch] = useReducer(reducer, [])

  const add = useCallback((log: CompilationLog) => {
    dispatch({ type: 'add', payload: log })
  }, [])

  const remove = useCallback((script: FileScriptCompilation) => {
    dispatch({ type: 'removeByScript', payload: script })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  return (
    <Context.Provider
      value={{
        logs,
        add,
        remove,
        clear,
        hasAnyError: logs.some((log) => log.status === 'error'),
        hasAllSuccess: A.isNonEmpty(logs) && logs.every((log) => log.status === 'success'),
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCompilationLogs = () => useContext(Context)

export default CompilationLogsProvider
