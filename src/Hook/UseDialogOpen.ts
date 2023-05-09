/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { fromNullable } from 'App/Lib/TsResults'
import { useState } from 'react'
import { type Option } from 'ts-results'

export const useDialogOpen = <S>({
  defaultState,
}: {
  defaultState: Option<S>
}): {
  isOpen: boolean
  open: (state?: S) => void
  state: Option<S>
  close: () => void
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
  }
}
