/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GitHubRelease } from 'App/GitHub/GitHubRelease'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { isLeft } from 'App/Lib/FpTs'
import { getLatestVersion } from 'App/Lib/Version'
import { Response } from '@tauri-apps/api/http'

const debugLog = createDebugLog('useLatestVersion')
const errorLog = createErrorLog('useLatestVersion')

export const useLatestVersion = (options: UseQueryOptions<Response<GitHubRelease>> = {}) => {
  return useQuery({
    queryKey: ['app', 'latest-version'],
    queryFn: async () => {
      void debugLog('get latest version')()

      const res = await getLatestVersion()()

      if (isLeft(res)) {
        void errorLog('error get latest version', res.left)()

        throw res.left
      }

      return res.right
    },
    cacheTime: Infinity,
    staleTime: Infinity,
    ...options,
  })
}
