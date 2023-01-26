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
import { match } from 'ts-pattern'

type Action<T extends FileScript> =
  | { type: 'add'; payload: T[] }
  | { type: 'remove'; payload: T[] }
  | { type: 'replace'; payload: T }
  | { type: 'clear' }

function reducer<T extends FileScript>(state: T[], action: Action<T>): T[] {
  return match(action)
    .with({ type: 'add' }, (action) => uniqObjectArrayByKeys([...state, ...action.payload])(['name']))
    .with({ type: 'remove' }, (action) =>
      pipe(
        state,
        A.filter((fileInState) => !action.payload.includes(fileInState)),
      ),
    )
    .with({ type: 'replace' }, (action) =>
      pipe(
        state,
        A.map((fileInState) =>
          match(fileInState.name === action.payload.name)
            .with(true, () => action.payload)
            .otherwise(() => fileInState),
        ),
      ),
    )
    .with({ type: 'clear' }, () => [])
    .exhaustive()
}

type ScriptsReducer<T extends FileScript> = (state: T[], action: Action<T>) => T[]

export const useScriptsList = <T extends FileScript>({ initialScripts = [] }: { initialScripts: T[] }) => {
  const [scripts, dispatch] = useReducer<ScriptsReducer<T>>(reducer, initialScripts)

  return {
    scripts,
    add: (files: T[]) => dispatch({ type: 'add', payload: files }),
    remove: (files: T[]) => dispatch({ type: 'remove', payload: files }),
    replace: (file: T) => dispatch({ type: 'replace', payload: file }),
    clear: () => dispatch({ type: 'clear' }),
  }
}
