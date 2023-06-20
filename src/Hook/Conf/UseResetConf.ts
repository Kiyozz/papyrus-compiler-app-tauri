/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/tauri'
import { createLogs } from 'App/Lib/CreateLog'
import { Result } from 'ts-results'

const logs = createLogs('useResetConf')

export const useResetConf = () => {
  return useMutation({
    mutationFn: async () => {
      logs.debug('resetting conf')

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const res: Result<never, Error> = await Result.wrapAsync(async () => await invoke('on_conf_reset'))

      if (res.err) {
        throw res.val
      }

      return res.val
    },
  })
}
