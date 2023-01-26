/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { checkConf, CheckConfError } from 'App/Lib/Conf/CheckConf'
import { CheckConfErrorTypes, isCheckConfError } from 'App/Lib/Conf/CheckConfTypes'
import { Conf } from 'App/Lib/Conf/ConfDecoder'
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
  if (!query.data || isNone(query.data)) {
    return false
  }

  if (isNone(type)) {
    return isCheckConfError(query.data.value)
  }

  return isCheckConfError(query.data.value) && (type.value as CheckConfErrorTypes[]).includes(query.data.value.type)
}

export const useCheckConf = (conf: O.Option<Conf>, options: UseQueryOptions<O.Option<CheckConfError>> = {}) => {
  return useQuery({
    queryKey: ['conf-check', conf],
    queryFn: async () => {
      invariant(O.isSome(conf), 'Conf is None') // should never occur
      console.log({ type: conf.value.game.type })
      const configChecked = await checkConf(conf.value)()

      if (E.isLeft(configChecked)) {
        return O.some(configChecked.left)
      }

      return O.none
    },
    enabled: O.isSome(conf),
    retry: false,
    cacheTime: 0,
    staleTime: 60 * 1000 * 5, // 5 minutes
    ...options,
  })
}
