/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useConf } from 'App/Hook/Conf/UseConf'
import { type CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { compileScript } from 'App/Lib/Compilation/CompileScript'

export const useCompile = (
  options: UseMutationOptions<CompilationLog, Error, Parameters<typeof compileScript>[1]> = {},
) => {
  const conf = useConf()

  return useMutation({
    mutationFn: async (script) => {
      if (!conf.isSuccess) {
        throw new Error('conf is not loaded')
      }

      const res = await compileScript(conf.data, script)

      if (res.err) {
        throw res.val
      }

      return res.val
    },
    ...options,
  })
}
