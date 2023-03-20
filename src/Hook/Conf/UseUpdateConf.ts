/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, type UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { writeConfig } from 'App/Lib/Conf/Conf'
import { createLogs } from 'App/Lib/CreateLog'

const logs = createLogs('useUpdateConf')

export const useUpdateConf = (options: UseMutationOptions<void, Error, Parameters<typeof writeConfig>[0]> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (partialConfig) => {
      logs.debug('updating conf', partialConfig)

      const res = await writeConfig(partialConfig)

      if (res.err) {
        logs.error('error updating conf', res.val)

        throw res.val
      }
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
