/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, type UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { createLogs } from 'App/Lib/CreateLog'
import { removeDefaultGroup } from 'App/Lib/Group/Group'

const logs = createLogs('useRemoveGroup')

export const useRemoveGroup = (
  options: UseMutationOptions<void, Error, Parameters<typeof removeDefaultGroup>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (groupId) => {
      logs.debug('remove group', groupId)

      const res = await removeDefaultGroup(groupId)

      if (res.err) {
        logs.error('error remove group', res.val)

        throw res.val
      }

      return res.val
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
