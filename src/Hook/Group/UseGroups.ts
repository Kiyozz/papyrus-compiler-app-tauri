/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type Groups } from 'App/Lib/Conf/ConfDecoder'
import { createLogs } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { readGroups } from 'App/Lib/Group/Group'

const logs = createLogs('useGroups')

export const useGroups = (options: UseQueryOptions<Groups> = {}) => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      void logs.debug('read groups')()

      const res = await readGroups()

      if (E.isLeft(res)) {
        void logs.error('error read groups', res.left)()

        throw res.left
      }

      return res.right
    },
    ...options,
  })
}
