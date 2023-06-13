/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type Environment } from 'App/Lib/Environment/Environment'
import { invoke } from '@tauri-apps/api'
import { Result } from 'ts-results'

export const useCurrentEnvironment = ({
  from,
  ...options
}: UseQueryOptions<Environment, Error> & { from?: string } = {}) => {
  return useQuery({
    queryKey: ['environment', 'current'],
    queryFn: async () => {
      const res = (
        await Result.wrapAsync(async () => await invoke<Environment>('current_environment', { from }))
      ).mapErr((reason) => new Error('cannot get current environment', { cause: reason }))

      if (res.err) {
        throw res.val
      }

      return res.val
    },
    staleTime: Infinity,
    ...options,
  })
}
