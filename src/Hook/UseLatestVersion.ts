/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type GitHubRelease } from 'App/GitHub/GitHubRelease'
import { createLogs } from 'App/Lib/CreateLog'
import { getLatestVersion } from 'App/Lib/Version'
import { type Response } from '@tauri-apps/api/http'

const logs = createLogs('useLatestVersion')

export const useLatestVersion = (options: UseQueryOptions<Response<GitHubRelease>> = {}) => {
  return useQuery({
    queryKey: ['app', 'latest-version'],
    queryFn: async () => {
      logs.debug('get latest version')()

      const res = await getLatestVersion()

      if (res.err) {
        logs.error('error get latest version', res.val)()

        throw res.val
      }

      return res.val
    },
    cacheTime: Infinity,
    staleTime: Infinity,
    ...options,
  })
}
