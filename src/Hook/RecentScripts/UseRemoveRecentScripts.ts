/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, type UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { createLogs } from 'App/Lib/CreateLog'
import { removeDefaultRecentScripts } from 'App/Lib/RecentScripts/RecentScripts'

const logs = createLogs('useRemoveRecentScripts')

export const useRemoveRecentScripts = (
  options: UseMutationOptions<void, Error, Parameters<typeof removeDefaultRecentScripts>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (recentScript) => {
      logs.debug('remove recent scripts', recentScript)

      const res = await removeDefaultRecentScripts(recentScript)

      if (res.err) {
        logs.error('error remove recent scripts', res.val)

        throw res.val
      }

      return res.val
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
