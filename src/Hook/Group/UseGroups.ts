/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Groups } from 'App/Lib/Conf/ConfDecoder'
import { E } from 'App/Lib/FpTs'
import { readGroups } from 'App/Lib/Group/Group'

export const useGroups = (options: UseQueryOptions<Groups> = {}) => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const res = await readGroups()

      if (E.isLeft(res)) {
        throw res.left
      }

      return res.right
    },
    ...options,
  })
}
