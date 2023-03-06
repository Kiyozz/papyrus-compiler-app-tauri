/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useState, type MouseEvent } from 'react'
import { None, type Option, Some } from 'ts-results'

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<Option<{ mouseX: number; mouseY: number }>>(None)

  return {
    contextMenu,
    handleContextMenu: (event: MouseEvent) => {
      event.preventDefault()
      setContextMenu(contextMenu.none ? Some({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 }) : None)
    },
    handleClose: () => {
      setContextMenu(None)
    },
    open: contextMenu.some,
  }
}
