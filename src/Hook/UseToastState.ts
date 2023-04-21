/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type Severity } from 'App/Type/Severity'
import { type ReactNode, useReducer } from 'react'
import { match, P } from 'ts-pattern'

type Action = { type: 'error'; payload: ReactNode } | { type: 'success'; payload: ReactNode } | { type: 'close' }
interface State {
  open: boolean
  message: ReactNode
  status: Extract<Severity, 'error' | 'success'>
}

export const useToastState = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      return match(action)
        .with({ type: 'error', payload: P.select() }, (message) => ({
          open: true,
          status: 'error' as const,
          message,
        }))
        .with({ type: 'success', payload: P.select() }, (message) => ({
          open: true,
          status: 'success' as const,
          message,
        }))
        .with({ type: 'close' }, () => ({
          ...state,
          open: false,
          message: '',
        }))
        .exhaustive()
    },
    { message: '', status: 'error', open: false },
  )

  return {
    close: () => {
      dispatch({ type: 'close' })
    },
    error: (error: ReactNode) => {
      dispatch({ type: 'error', payload: error })
    },
    success: (message: string) => {
      dispatch({ type: 'success', payload: message })
    },
    state,
  }
}
