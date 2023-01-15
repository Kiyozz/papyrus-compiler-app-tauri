/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { checkConf } from 'App/Lib/Conf/CheckConf'
import { Conf } from 'App/Lib/Conf/ConfDecoder'
import { readConfig } from 'App/Lib/Conf/Conf'
import { E } from 'App/Lib/FpTs'

export const useConf = (options: UseQueryOptions<Conf> = {}) => {
  return useQuery({
    queryKey: ['conf'],
    queryFn: async () => {
      const config = await readConfig()

      if (E.isLeft(config)) {
        throw config.left
      }

      const checkConfRes = await checkConf(config.right)()

      if (E.isLeft(checkConfRes)) {
        throw checkConfRes.left
      }

      return checkConfRes.right
    },
    staleTime: 1000 * 60 * 5, // 1 minutes
    ...options,
  })
}
