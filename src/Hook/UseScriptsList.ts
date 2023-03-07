/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { uniqObjectArrayByKeys } from 'App/Lib/UniqObjectArrayByKeys'
import { useCallback, useReducer } from 'react'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { match } from 'ts-pattern'

type Action<T extends FileScript> =
  | { type: 'add'; payload: T[] }
  | { type: 'remove'; payload: T[] }
  | { type: 'replace'; payload: T }
  | { type: 'reset'; payload: T[] }
  | { type: 'clear' }

function reducer<T extends FileScript>(state: T[], action: Action<T>): T[] {
  return match(action)
    .with({ type: 'add' }, (action) => uniqObjectArrayByKeys([...state, ...action.payload])(['name']))
    .with({ type: 'remove' }, (action) => state.filter((fileInState) => !action.payload.includes(fileInState)))
    .with({ type: 'replace' }, (action) =>
      state.map((fileInState) =>
        match(fileInState.name === action.payload.name)
          .with(true, () => action.payload)
          .otherwise(() => fileInState),
      ),
    )
    .with({ type: 'clear' }, () => [])
    .with({ type: 'reset' }, ({ payload }) => payload)
    .exhaustive()
}

type ScriptsReducer<T extends FileScript> = (state: T[], action: Action<T>) => T[]

export const useScriptsList = <T extends FileScript>({ initialScripts = [] }: { initialScripts: T[] }) => {
  const [scripts, dispatch] = useReducer<ScriptsReducer<T>>(reducer, initialScripts)

  const add = useCallback((files: T[]) => {
    dispatch({ type: 'add', payload: files })
  }, [])

  const remove = useCallback((files: T[]) => {
    dispatch({ type: 'remove', payload: files })
  }, [])

  const replace = useCallback((file: T) => {
    dispatch({ type: 'replace', payload: file })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const reset = useCallback((files: T[]) => {
    dispatch({ type: 'reset', payload: files })
  }, [])

  return {
    scripts,
    add,
    remove,
    replace,
    clear,
    reset,
  }
}
