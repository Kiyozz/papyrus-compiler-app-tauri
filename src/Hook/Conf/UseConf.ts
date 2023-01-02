/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Conf } from 'App/Service/Conf/ConfDecoder'
import { readConfig } from 'App/Service/Conf/ConfFp'
import { E } from 'App/Util/FpTs'

export const useConf = (options: UseQueryOptions<Conf> = {}) => {
  return useQuery({
    queryKey: ['conf'],
    queryFn: async () => {
      const config = await readConfig()

      if (E.isLeft(config)) {
        throw config.left
      }

      return config.right
    },
    ...options,
  })
}
