/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { removeDefaultGroup } from 'App/Lib/Group/Group'

const debugLog = createDebugLog('useRemoveGroup')
const errorLog = createErrorLog('useRemoveGroup')

export const useRemoveGroup = (
  options: UseMutationOptions<void, Error, Parameters<typeof removeDefaultGroup>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (groupId) => {
      void debugLog('remove group', groupId)()

      const res = await removeDefaultGroup(groupId)()

      if (E.isLeft(res)) {
        void errorLog('error remove group', res.left)()

        throw res.left
      }

      return res.right
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['groups'], type: 'all' })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'], type: 'all' })
    },
    ...options,
  })
}
