/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { fromNullable } from 'App/Lib/TsResults'
import { useCallback, useState } from 'react'
import { type Option } from 'ts-results'

export const useDialog = <S>({
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
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((state?: S) => {
    setState(fromNullable(state))
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    open,
    state,
    close,
  }
}
