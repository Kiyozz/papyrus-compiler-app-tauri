/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type Groups } from 'App/Lib/Conf/ConfZod'
import { createLogs } from 'App/Lib/CreateLog'
import { readGroups } from 'App/Lib/Group/Group'

const logs = createLogs('useGroups')

export const useGroups = (options: UseQueryOptions<Groups> = {}) => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      logs.debug('read groups')()

      const res = await readGroups()

      if (res.err) {
        logs.error('error read groups', res.val)()

        throw res.val
      }

      return res.val
    },
    ...options,
  })
}
