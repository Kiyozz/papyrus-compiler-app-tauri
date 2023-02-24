/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { listen, Event } from '@tauri-apps/api/event'
import { useEffect } from 'react'

export const useListenCheckForUpdates = ({
  onCheckForUpdates,
}: {
  onCheckForUpdates: (event: Event<void>) => void
}) => {
  useEffect(() => {
    const unsubscribe = listen<void>('pca://check_for_updates', onCheckForUpdates)

    return () => {
      unsubscribe.then((unsub) => unsub())
    }
  }, [])
}
