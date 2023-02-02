/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GitHubRelease } from 'App/GitHub/GitHubRelease'
import { isLeft } from 'App/Lib/FpTs'
import { getLatestVersion } from 'App/Lib/Version'
import { Response } from '@tauri-apps/api/http'

export const useLatestVersion = (options: UseQueryOptions<Response<GitHubRelease>> = {}) => {
  return useQuery({
    queryKey: ['app', 'latest-version'],
    queryFn: async () => {
      const res = await getLatestVersion()()

      if (isLeft(res)) {
        throw res.left
      }

      return res.right
    },
    cacheTime: Infinity,
    staleTime: Infinity,
    ...options,
  })
}
