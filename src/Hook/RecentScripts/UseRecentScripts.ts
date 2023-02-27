/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { getLastPartOfPath } from 'App/Lib/Path'
import { readRecentScripts } from 'App/Lib/RecentScripts/RecentScripts'
import { v4 } from 'uuid'

const debugLog = createDebugLog('useRecentScripts')
const errorLog = createErrorLog('useRecentScripts')

export const useRecentScripts = (options: UseQueryOptions<FileScript[]> = {}) => {
  return useQuery({
    queryKey: ['recentScripts'],
    queryFn: async () => {
      void debugLog('read recent scripts')()

      const res = await readRecentScripts()

      if (E.isLeft(res)) {
        void errorLog('error read recent scripts', res.left)()

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
