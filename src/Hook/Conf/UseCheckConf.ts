/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { checkConf, type CheckConfError } from 'App/Lib/Conf/CheckConf'
import { type CheckConfErrorTypes, isCheckConfError } from 'App/Lib/Conf/CheckConfTypes'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { None, type Option, Some } from 'ts-results'

/**
 * If the Query contains a check error.
 *
 * @param query
 * @param type
 */
export const isCheckConfQueryError = <T extends CheckConfErrorTypes>(
  query: UseQueryResult<Option<CheckConfError>>,
  type: Option<readonly T[]> = None,
): query is UseQueryResult<Some<CheckConfError<T>>> & { isSuccess: true } => {
  if (query.data == null || query.data.none) {
    return false
  }

  if (type.none) {
    return isCheckConfError(query.data.val)
  }

  return isCheckConfError(query.data.val) && (type.val as readonly CheckConfErrorTypes[]).includes(query.data.val.type)
}

export const useCheckConf = (conf: Option<Conf>, options: UseQueryOptions<Option<CheckConfError>> = {}) => {
  const { step } = useSettingsTutorial()

  return useQuery({
    queryKey: ['conf-check', conf],
    queryFn: async () => {
      const configChecked = await checkConf(conf.expect('Conf is None'))

      if (configChecked.err) {
        return Some(configChecked.val)
      }

      return None
    },
    enabled: conf.some && step.some && step.val === 'end',
    retry: false,
    cacheTime: 0,
    staleTime: 60 * 1000 * 5, // 5 minutes
    ...options,
  })
}
