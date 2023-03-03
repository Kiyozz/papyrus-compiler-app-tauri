/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type DialogProps } from '@mui/material/Dialog'
import { O } from 'App/Lib/FpTs'
import { useState } from 'react'

export const useDialogOpen = <S>({
  onExited,
  defaultState,
}: {
  defaultState: O.Option<S>
  onExited?: () => void
}): {
  isOpen: boolean
  open: (state?: S) => void
  state: O.Option<S>
  close: () => void
  TransitionProps: DialogProps['TransitionProps']
} => {
  const [state, setState] = useState<O.Option<S>>(defaultState)
  const [open, setOpen] = useState(false)

  return {
    isOpen: open,
    open: (state) => {
      setState(O.fromNullable(state))
      setOpen(true)
    },
    state,
    close: () => {
      setOpen(false)
    },
    TransitionProps: {
      onExited: () => {
        setState(O.none)

        return onExited?.()
      },
    },
  }
}
