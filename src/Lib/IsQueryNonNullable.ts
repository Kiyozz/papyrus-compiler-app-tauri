/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type UseQueryResult, type QueryObserverSuccessResult } from '@tanstack/react-query'

export const isQueryNonNullable = <TData, TError>(
  query: UseQueryResult<TData, TError>,
): query is QueryObserverSuccessResult<TData, TError> => {
  return !query.isLoading && !query.isError
}
