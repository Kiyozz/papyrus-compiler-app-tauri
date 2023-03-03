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
import { type Conf } from 'App/Lib/Conf/ConfDecoder'
import { E, isNone, O } from 'App/Lib/FpTs'
import invariant from 'tiny-invariant'

/**
 * If the Query contains a check error.
 *
 * @param query
 * @param type
 */
export const isCheckConfQueryError = <T extends CheckConfErrorTypes>(
  query: UseQueryResult<O.Option<CheckConfError>>,
  type: O.Option<T[]> = O.none,
): query is UseQueryResult<O.Some<CheckConfError<T>>> & { isSuccess: true } => {
  if (query.data == null || isNone(query.data)) {
    return false
  }

  if (isNone(type)) {
    return isCheckConfError(query.data.value)
  }

  return isCheckConfError(query.data.value) && (type.value as CheckConfErrorTypes[]).includes(query.data.value.type)
}

export const useCheckConf = (conf: O.Option<Conf>, options: UseQueryOptions<O.Option<CheckConfError>> = {}) => {
  const { step } = useSettingsTutorial()

  return useQuery({
    queryKey: ['conf-check', conf],
    queryFn: async () => {
      invariant(O.isSome(conf), 'Conf is None') // should never occur
      const configChecked = await checkConf(conf.value)()

      if (E.isLeft(configChecked)) {
        return O.some(configChecked.left)
      }

      return O.none
    },
    enabled: O.isSome(conf) && O.isSome(step) && step.value === 'end',
    retry: false,
    cacheTime: 0,
    staleTime: 60 * 1000 * 5, // 5 minutes
    ...options,
  })
}
