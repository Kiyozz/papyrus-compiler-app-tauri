/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type DialogProps } from '@mui/material/Dialog'
import { fromNullable } from 'App/Lib/TsResults'
import { useState } from 'react'
import { None, type Option } from 'ts-results'

export const useDialogOpen = <S>({
  onExited,
  defaultState,
}: {
  defaultState: Option<S>
  onExited?: () => void
}): {
  isOpen: boolean
  open: (state?: S) => void
  state: Option<S>
  close: () => void
  TransitionProps: DialogProps['TransitionProps']
} => {
  const [state, setState] = useState<Option<S>>(defaultState)
  const [open, setOpen] = useState(false)

  return {
    isOpen: open,
    open: (state) => {
      setState(fromNullable(state))
      setOpen(true)
    },
    state,
    close: () => {
      setOpen(false)
    },
    TransitionProps: {
      onExited: () => {
        setState(None)

        return onExited?.()
      },
    },
  }
}
