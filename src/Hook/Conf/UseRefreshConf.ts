/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQueryClient } from '@tanstack/react-query'
import { createDebugLog } from 'App/Lib/CreateLog'
import { useCallback } from 'react'

const debugLog = createDebugLog('useRefreshConf')

export const useRefreshConf = () => {
  const queryClient = useQueryClient()

  return useCallback(() => {
    debugLog('refreshing conf')()

    return queryClient.invalidateQueries({
      queryKey: ['conf'],
      type: 'all',
    })
  }, [queryClient])
}
