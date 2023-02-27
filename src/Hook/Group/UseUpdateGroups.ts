/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'
import { writeDefaultGroups } from 'App/Lib/Group/Group'

const debugLog = createDebugLog('useUpdateGroups')
const errorLog = createErrorLog('useUpdateGroups')

export const useUpdateGroups = (
  options: UseMutationOptions<void, Error, Parameters<typeof writeDefaultGroups>[0]> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (partialGroups) => {
      void debugLog('update groups', partialGroups)()

      const res = await writeDefaultGroups(partialGroups)()

      if (E.isLeft(res)) {
        void errorLog('error update groups', res.left)()

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
