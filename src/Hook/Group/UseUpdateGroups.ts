/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { E } from 'App/Lib/FpTs'
import { writeGroups } from 'App/Lib/Group/Group'

export const useUpdateGroups = (options: UseMutationOptions<void, Error, Parameters<typeof writeGroups>[0]> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (partialGroups) => {
      const res = await writeGroups(partialGroups)()

      if (E.isLeft(res)) {
        throw res.left
      }

      return res.right
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['groups'], type: 'all' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'], type: 'all' })
    },
    ...options,
  })
}
