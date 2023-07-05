/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { readConfig } from 'App/Lib/Conf/Conf'
import { createLogs } from 'App/Lib/CreateLog'

const logs = createLogs('useConf')

export const useConf = (options: UseQueryOptions<Conf> = {}) => {
  return useQuery({
    queryKey: ['conf'],
    queryFn: async () => {
      logs.debug('read conf')

      const config = await readConfig()

      logs.trace('conf read')

      if (config.err) {
        logs.error('conf read failed', config.val)

        throw config.val
      }

      return config.val
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 0,
    ...options,
  })
}
