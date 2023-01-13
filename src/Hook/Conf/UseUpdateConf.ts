/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { writeConfig } from 'App/Lib/Conf/Conf'
import { E } from 'App/Lib/FpTs'

export const useUpdateConf = (options: UseMutationOptions<void, Error, Parameters<typeof writeConfig>[0]> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (partialConfig) => {
      const res = await writeConfig(partialConfig)()

      if (E.isLeft(res)) {
        throw res.left
      }

      return res.right
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['conf'], type: 'all' })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['conf'], type: 'all' })
    },
    ...options,
  })
}
