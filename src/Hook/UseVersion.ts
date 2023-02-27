/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { createLog } from 'App/Lib/CreateLog'
import { getVersion } from 'App/Lib/Version'

export type Version = string

const log = createLog('useVersion')

export const useVersion = (options: UseQueryOptions<Version> = {}) => {
  return useQuery({
    queryKey: ['app', 'version'],
    queryFn: async () => {
      const version = await getVersion()

      void log('app version', version)()

      return version
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options,
  })
}
