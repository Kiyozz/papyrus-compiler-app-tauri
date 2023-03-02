/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Conf } from 'App/Lib/Conf/ConfDecoder'
import { readConfig } from 'App/Lib/Conf/Conf'
import { E } from 'App/Lib/FpTs'
import { createLogs } from 'App/Lib/CreateLog'

const logs = createLogs('useConf')

export const useConf = (options: UseQueryOptions<Conf> = {}) => {
  return useQuery({
    queryKey: ['conf'],
    queryFn: async () => {
      void logs.debug('read config')()

      const config = await readConfig()

      void logs.trace('config read')()

      if (E.isLeft(config)) {
        void logs.error('config read failed', config.left)()

        throw config.left
      }

      return config.right
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  })
}
