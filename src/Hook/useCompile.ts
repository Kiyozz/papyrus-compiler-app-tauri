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
import { isLeft } from 'App/Lib/FpTs'

export const useCompile = (
  options: UseMutationOptions<CompilationLog, Error, Parameters<ReturnType<typeof compileScript>>[0]> = {},
) => {
  const conf = useConf()

  return useMutation({
    mutationFn: async (script) => {
      if (!conf.isSuccess) {
        throw new Error('conf is not loaded')
      }

      const res = await compileScript(conf.data)(script)()

      if (isLeft(res)) {
        throw res.left
      }

      return res.right
    },
    ...options,
  })
}
