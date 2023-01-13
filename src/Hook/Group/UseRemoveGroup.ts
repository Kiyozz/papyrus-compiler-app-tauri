/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { E } from 'App/Lib/FpTs'
import { removeDefaultGroup } from 'App/Lib/Group/Group'

export const useRemoveGroup = (
  options: UseMutationOptions<void, Error, Parameters<typeof removeDefaultGroup>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (groupId) => {
      const res = await removeDefaultGroup(groupId)()

      if (E.isLeft(res)) {
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
