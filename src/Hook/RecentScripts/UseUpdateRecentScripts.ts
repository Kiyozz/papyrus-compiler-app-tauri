/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { writeDefaultRecentScripts } from 'App/Lib/RecentScripts/RecentScripts'

const debugLog = createDebugLog('useUpdateRecentScripts')
const errorLog = createErrorLog('useUpdateRecentScripts')

export const useUpdateRecentScripts = (
  options: UseMutationOptions<void, Error, Parameters<typeof writeDefaultRecentScripts>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params) => {
      void debugLog('update recent scripts', params)()

      const res = await writeDefaultRecentScripts(params)()

      if (E.isLeft(res)) {
        void errorLog('error update recent scripts', res.left)()

        throw res.left
      }

      return res.right
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['recentScripts'], type: 'all' })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recentScripts'], type: 'all' })
    },
    ...options,
  })
}
