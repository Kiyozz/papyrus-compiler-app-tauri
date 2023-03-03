/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQueryClient } from '@tanstack/react-query'
import { listen } from '@tauri-apps/api/event'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type Conf, ConfDecoder } from 'App/Lib/Conf/ConfDecoder'
import { isLeft } from 'App/Lib/FpTs'
import { D } from 'App/Lib/IoTs'
import { useEffect } from 'react'

export const useListenConfReset = () => {
  const queryClient = useQueryClient()
  const { trackEvent } = useMatomo()

  useEffect(() => {
    const unsubscribe = listen<Conf>('pca://conf_reset', (evt) => {
      const conf = ConfDecoder.decode(evt.payload)

      if (isLeft(conf)) {
        throw new Error(`Cannot decode conf, error given: ${D.draw(conf.left)}`)
      }

      trackEvent({
        category: 'Conf',
        action: 'Reset',
        name: 'App menu',
      })

      queryClient.setQueryData(['conf'], conf.right)
      void queryClient.invalidateQueries(['conf-check', conf.right])
    })

    return () => {
      void unsubscribe.then((unsub) => {
        unsub()
      })
    }
  }, [queryClient, trackEvent])
}
