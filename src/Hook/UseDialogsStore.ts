/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useDialogsStore = create(
  combine(
    {
      compilationLogs: false,
      openDocumentation: false,
    },
    (set) => ({
      setCompilationLogs: (value: boolean) => {
        set({ compilationLogs: value })
      },
      setOpenDocumentation: (value: boolean) => {
        set({ openDocumentation: value })
      },
    }),
  ),
)
