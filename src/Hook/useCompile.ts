/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useConf } from 'App/Hook/Conf/UseConf'
import { CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { compileScript } from 'App/Lib/Compilation/CompileScript'
import { O } from 'App/Lib/FpTs'

export const useCompile = (
  options: UseMutationOptions<O.Option<CompilationLog>, Error, Parameters<ReturnType<typeof compileScript>>[0]> = {},
) => {
  const conf = useConf()

  return useMutation({
    mutationFn: async (script) => {
      if (!conf.isSuccess) return O.none

      const res = await compileScript(conf.data)(script)()

      return O.fromEither(res)
    },
    ...options,
  })
}
