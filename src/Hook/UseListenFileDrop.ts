/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { listen, Event } from '@tauri-apps/api/event'
import { useEffect } from 'react'

export const useListenFileDrop = ({ onDrop }: { onDrop: (event: Event<string[]>) => void }) => {
  useEffect(() => {
    const unsubscribe = listen<string[]>('tauri://file-drop', onDrop)

    return () => {
      unsubscribe.then((unsub) => unsub())
    }
  }, [])
}
