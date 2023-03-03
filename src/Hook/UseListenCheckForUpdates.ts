/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { listen, type Event } from '@tauri-apps/api/event'
import { useEffect } from 'react'

export const useListenCheckForUpdates = ({
  onCheckForUpdates,
}: {
  onCheckForUpdates: (event: Event<void>) => void
}) => {
  useEffect(() => {
    const unsubscribe = listen('pca://check_for_updates', onCheckForUpdates)

    return () => {
      void unsubscribe.then((unsub) => {
        unsub()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
