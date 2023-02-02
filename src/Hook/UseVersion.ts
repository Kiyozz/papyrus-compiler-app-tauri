/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getVersion } from 'App/Lib/Version'

export type Version = string

export const useVersion = (options: UseQueryOptions<Version> = {}) => {
  return useQuery({
    queryKey: ['app', 'version'],
    queryFn: async () => {
      return getVersion()
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options,
  })
}
