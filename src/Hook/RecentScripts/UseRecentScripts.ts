/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type FileScript } from 'App/Lib/Conf/ConfDecoder'
import { createLogs } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { getLastPartOfPath } from 'App/Lib/Path'
import { readRecentScripts } from 'App/Lib/RecentScripts/RecentScripts'
import { v4 } from 'uuid'

const logs = createLogs('useRecentScripts')

export const useRecentScripts = (options: UseQueryOptions<FileScript[]> = {}) => {
  return useQuery({
    queryKey: ['recentScripts'],
    queryFn: async () => {
      void logs.debug('read recent scripts')()

      const res = await readRecentScripts()

      if (E.isLeft(res)) {
        void logs.error('error read recent scripts', res.left)()

        throw res.left
      }

      return res.right.map((script) => ({
        id: v4(),
        path: script,
        name: getLastPartOfPath(script),
      }))
    },
    ...options,
  })
}
