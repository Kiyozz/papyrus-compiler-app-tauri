/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { A, pipe } from 'App/Lib/FpTs'
import { uniqObjectArrayByKeys } from 'App/Lib/UniqObjectArrayByKeys'
import { useReducer } from 'react'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'

type Action<T extends FileScript> =
  | { type: 'add'; payload: T[] }
  | { type: 'remove'; payload: T[] }
  | { type: 'removeById'; payload: T[] }
  | { type: 'clear' }

function reducer<T extends FileScript>(state: T[], action: Action<T>): T[] {
  switch (action.type) {
    case 'add':
      return uniqObjectArrayByKeys([...state, ...action.payload])(['name'])
    case 'remove': // check in compilation page, dispatch is called twice
      return pipe(
        state,
        A.filter((fileInState) => !action.payload.includes(fileInState)),
      )
    case 'removeById':
      return pipe(
        state,
        A.filter((fileInState) => !action.payload.map((f) => f.id).includes(fileInState.id)),
      )
    case 'clear':
      return []
  }
}

type ScriptsReducer<T extends FileScript> = (state: T[], action: Action<T>) => T[]

export function useScriptsList<T extends FileScript>({ initialScripts = [] }: { initialScripts: T[] }) {
  const [scripts, dispatch] = useReducer<ScriptsReducer<T>>(reducer, initialScripts)

  return {
    scripts,
    add: (files: T[]) => dispatch({ type: 'add', payload: files }),
    remove: (files: T[]) => dispatch({ type: 'remove', payload: files }),
    removeById: (files: T[]) => dispatch({ type: 'removeById', payload: files }),
    clear: () => dispatch({ type: 'clear' }),
  }
}
