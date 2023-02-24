/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQueryClient } from '@tanstack/react-query'
import { listen } from '@tauri-apps/api/event'
import { Conf, ConfDecoder } from 'App/Lib/Conf/ConfDecoder'
import { isLeft } from 'App/Lib/FpTs'
import { D } from 'App/Lib/IoTs'
import { useEffect } from 'react'

export const useListenConfReset = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = listen<Conf>('pca://conf_reset', (evt) => {
      const conf = ConfDecoder.decode(evt.payload)

      if (isLeft(conf)) {
        throw new Error(`Cannot decode conf, error given: ${D.draw(conf.left)}`)
      }

      queryClient.setQueryData(['conf'], conf.right)
    })

    return () => {
      unsubscribe.then((unsub) => unsub())
    }
  }, [])
}
