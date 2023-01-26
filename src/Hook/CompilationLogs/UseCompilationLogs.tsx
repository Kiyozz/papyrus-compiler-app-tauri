/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { A } from 'App/Lib/FpTs'
import { createContext, PropsWithChildren, useContext, useReducer } from 'react'
import { match, P } from 'ts-pattern'

type ContextShape = {
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

const Context = createContext({} as ContextShape)

const CompilationLogsProvider = ({ children }: PropsWithChildren) => {
  const [logs, dispatch] = useReducer(reducer, [])

  return (
    <Context.Provider
      value={{
        logs,
        add: (log: CompilationLog) => dispatch({ type: 'add', payload: log }),
        remove: (log: FileScriptCompilation) => dispatch({ type: 'removeByScript', payload: log }),
        clear: () => dispatch({ type: 'clear' }),
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
