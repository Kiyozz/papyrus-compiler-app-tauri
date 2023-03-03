/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useState, type MouseEvent } from 'react'
import { isNone, isSome, none, type Option, some } from '../Lib/FpTs'

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<Option<{ mouseX: number; mouseY: number }>>(none)

  return {
    contextMenu,
    handleContextMenu: (event: MouseEvent) => {
      event.preventDefault()
      setContextMenu(isNone(contextMenu) ? some({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 }) : none)
    },
    handleClose: () => {
      setContextMenu(none)
    },
    open: isSome(contextMenu),
  }
}
