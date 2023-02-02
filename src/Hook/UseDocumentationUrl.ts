/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { documentationUrl } from 'App/Constant/Documentation'
import { useCurrentEnvironment } from 'App/Hook/UseCurrentEnvironment'
import { isProduction } from 'App/Lib/Environment/IsProduction'

const useDocumentationUrl = (options: UseQueryOptions<string> = {}) => {
  const currentEnvironment = useCurrentEnvironment()

  return useQuery({
    queryKey: ['app', 'documentation', 'url'],
    queryFn: () => {
      if (!currentEnvironment.data) {
        return ''
      }

      return isProduction(currentEnvironment.data) ? documentationUrl.production : documentationUrl.development
    },
    enabled: currentEnvironment.isSuccess,
    cacheTime: Infinity,
    staleTime: Infinity,
    ...options,
  })
}

export default useDocumentationUrl
