/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQueryClient } from '@tanstack/react-query'
import { listen } from '@tauri-apps/api/event'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type Conf, ConfZod } from 'App/Lib/Conf/ConfZod'
import { useEffect } from 'react'

export const useListenConfReset = () => {
  const queryClient = useQueryClient()
  const { trackEvent } = useMatomo()

  useEffect(() => {
    const unsubscribe = listen<Conf>('pca://conf_reset', (evt) => {
      const conf = ConfZod.safeParse(evt.payload)

      if (!conf.success) {
        throw new Error(`Cannot parse conf, error given: ${conf.error.message}`)
      }

      trackEvent({
        category: 'Conf',
        action: 'Reset',
        name: 'App menu',
      })

      queryClient.setQueryData(['conf'], conf.data)
      void queryClient.invalidateQueries(['conf-check', conf.data])
    })

    return () => {
      void unsubscribe.then((unsub) => {
        unsub()
      })
    }
  }, [queryClient, trackEvent])
}
