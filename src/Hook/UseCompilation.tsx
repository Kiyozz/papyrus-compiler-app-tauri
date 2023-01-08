/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { A, pipe } from 'App/Lib/FpTs'
import { FileScriptCompilation } from 'App/Type/FileScriptCompilation'
import { useReducer } from 'react'

type Action =
  | { type: 'add'; payload: FileScriptCompilation[] }
  | { type: 'remove'; payload: FileScriptCompilation[] }
  | { type: 'clear' }

function reducer(state: FileScriptCompilation[], action: Action) {
  switch (action.type) {
    case 'add':
      return pipe(
        [...state, ...action.payload],
        A.filter((file) => !state.some((f) => f.path === file.path)),
      )
    case 'remove':
      return pipe(
        state,
        A.filter((file) => !action.payload.includes(file)),
      )
    case 'clear':
      return []
  }
}

export function useCompilation() {
  const running = false
  const [scripts, dispatch] = useReducer(reducer, [])

  return {
    running,
    scripts,
    add: (files: FileScriptCompilation[]) => dispatch({ type: 'add', payload: files }),
    remove: (files: FileScriptCompilation[]) => dispatch({ type: 'remove', payload: files }),
    clear: () => dispatch({ type: 'clear' }),
  }
}
