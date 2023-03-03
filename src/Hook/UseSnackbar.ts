/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useReducer } from 'react'
import { match, P } from 'ts-pattern'

type Action = { type: 'error'; payload: Error } | { type: 'success' } | { type: 'close' } | { type: 'empty' }
interface State {
  open: boolean
  message: string
  status: 'error' | 'success'
}

export const useSnackbar = ({
  errorMessage,
  successMessage,
}: {
  errorMessage: (error: string) => string
  successMessage: () => string
}) => {
  const [snackbar, dispatch] = useReducer(
    (state: State, action: Action): State => {
      return match(action)
        .with({ type: 'error', payload: P.select() }, (payload) => ({
          message: errorMessage(payload.message),
          open: true,
          status: 'error' as const,
        }))
        .with({ type: 'success' }, () => ({
          message: successMessage(),
          open: true,
          status: 'success' as const,
        }))
        .with({ type: 'close' }, () => ({
          ...state,
          open: false,
        }))
        .with({ type: 'empty' }, () => ({
          ...state,
          message: '',
        }))
        .exhaustive()
    },
    { message: '', status: 'error', open: false },
  )

  return {
    empty: () => { dispatch({ type: 'empty' }); },
    close: () => { dispatch({ type: 'close' }); },
    error: (error: Error) => { dispatch({ type: 'error', payload: error }); },
    success: () => { dispatch({ type: 'success' }); },
    snackbar,
  }
}
