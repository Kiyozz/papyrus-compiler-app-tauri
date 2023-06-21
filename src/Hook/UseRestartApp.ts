/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { relaunch } from '@tauri-apps/api/process'
import { useCallback } from 'react'

export function useRestartApp() {
  return useCallback(async () => {
    await relaunch()
  }, [])
}
