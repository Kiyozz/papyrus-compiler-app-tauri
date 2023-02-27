/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { removeDefaultRecentScripts } from 'App/Lib/RecentScripts/RecentScripts'

const debugLog = createDebugLog('useRemoveRecentScripts')
const errorLog = createErrorLog('useRemoveRecentScripts')

export const useRemoveRecentScripts = (
  options: UseMutationOptions<void, Error, Parameters<typeof removeDefaultRecentScripts>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (recentScript) => {
      void debugLog('remove recent scripts', recentScript)()

      const res = await removeDefaultRecentScripts(recentScript)()

      if (E.isLeft(res)) {
        void errorLog('error remove recent scripts', res.left)()

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
