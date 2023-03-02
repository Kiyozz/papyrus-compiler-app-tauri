/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { writeConfig } from 'App/Lib/Conf/Conf'
import { createLogs } from 'App/Lib/CreateLog'
import { E } from 'App/Lib/FpTs'

const logs = createLogs('useUpdateConf')

export const useUpdateConf = (options: UseMutationOptions<void, Error, Parameters<typeof writeConfig>[0]> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (partialConfig) => {
      void logs.debug('updating conf', partialConfig)()

      const res = await writeConfig(partialConfig)()

      if (E.isLeft(res)) {
        void logs.error('error updating conf', res.left)()

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
