/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/UseConf'
import { Settings } from 'App/Type/Settings/Settings'
import { useQuery } from '@tanstack/react-query'

export function useConfKey<K extends keyof Settings>(key: K) {
  const conf = useConf()

  return useQuery({
    queryKey: ['conf', key],
    queryFn: () => conf.get(key),
  })
}
