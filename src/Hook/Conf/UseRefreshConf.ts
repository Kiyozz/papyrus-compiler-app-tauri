/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useConf } from 'App/Hook/Conf/UseConf'
import { createLogs } from 'App/Lib/CreateLog'

const logs = createLogs('useRefreshConf')

export const useRefreshConf = () => {
  const conf = useConf()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      logs.debug('refreshing conf')

      await queryClient.invalidateQueries({
        queryKey: ['conf'],
        type: 'all',
      })
      void queryClient.invalidateQueries(['conf-check', conf.data])
    },
  })
}
