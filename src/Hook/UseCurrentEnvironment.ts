/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type Environment } from 'App/Lib/Environment/Environment'
import { isLeft, TE } from 'App/Lib/FpTs'
import { invoke } from '@tauri-apps/api'

export const useCurrentEnvironment = ({
  from,
  ...options
}: UseQueryOptions<Environment, Error> & { from?: string } = {}) => {
  return useQuery({
    queryKey: ['environment', 'current'],
    queryFn: async () => {
      const res = await TE.tryCatch(
        async () => await invoke<Environment>('current_environment', { from }),
        (reason) => new Error(`Cannot get current environment, error given: ${reason}`),
      )()

      if (isLeft(res)) {
        throw res.left
      }

      return res.right
    },
    staleTime: Infinity,
    ...options,
  })
}
