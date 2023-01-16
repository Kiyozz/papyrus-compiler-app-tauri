/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useRefreshConf = () => {
  const queryClient = useQueryClient()

  return useCallback(() => {
    return queryClient.invalidateQueries({
      queryKey: ['conf'],
      type: 'all',
    })
  }, [queryClient])
}
