/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQueryClient } from '@tanstack/react-query'
import { createLogs } from 'App/Lib/CreateLog'
import { useCallback } from 'react'

const logs = createLogs('useRefreshConf')

export const useRefreshConf = () => {
  const queryClient = useQueryClient()

  return useCallback(async () => {
    logs.debug('refreshing conf')

    await queryClient.invalidateQueries({
      queryKey: ['conf'],
      type: 'all',
    })
  }, [queryClient])
}
