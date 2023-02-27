/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { writeConfig } from 'App/Lib/Conf/Conf'
import { createDebugLog, createErrorLog } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'

const debugLog = createDebugLog('useUpdateConf')
const errorLog = createErrorLog('useUpdateConf')

export const useUpdateConf = (options: UseMutationOptions<void, Error, Parameters<typeof writeConfig>[0]> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (partialConfig) => {
      void debugLog('updating conf', partialConfig)()

      const res = await writeConfig(partialConfig)()

      if (E.isLeft(res)) {
        void errorLog('error updating conf', res.left)()

        throw res.left
      }

      return res.right
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['conf'], type: 'all', exact: true })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['conf'], type: 'all' })
    },
    ...options,
  })
}
