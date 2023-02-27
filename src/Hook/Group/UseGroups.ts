/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Groups } from 'App/Lib/Conf/ConfDecoder'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { readGroups } from 'App/Lib/Group/Group'

const debugLog = createDebugLog('useGroups')
const errorLog = createErrorLog('useGroups')

export const useGroups = (options: UseQueryOptions<Groups> = {}) => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      void debugLog('read groups')()

      const res = await readGroups()

      if (E.isLeft(res)) {
        void errorLog('error read groups', res.left)()

        throw res.left
      }

      return res.right
    },
    ...options,
  })
}
