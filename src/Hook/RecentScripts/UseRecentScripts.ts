/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { createLogs } from 'App/Lib/CreateLog'
import { getLastPartOfPath } from 'App/Lib/Path'
import { readRecentScripts } from 'App/Lib/RecentScripts/RecentScripts'
import { v4 } from 'uuid'

const logs = createLogs('useRecentScripts')

export const useRecentScripts = (options: UseQueryOptions<FileScript[]> = {}) => {
  return useQuery({
    queryKey: ['recentScripts'],
    queryFn: async () => {
      logs.debug('read recent scripts')

      const res = await readRecentScripts()

      if (res.err) {
        logs.error('error read recent scripts', res.val)

        throw res.val
      }

      return res.val.map((script) => ({
        id: v4(),
        path: script,
        name: getLastPartOfPath(script),
      }))
    },
    ...options,
  })
}
