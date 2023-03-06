/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { invoke } from '@tauri-apps/api/tauri'
import { Result } from 'ts-results'

/**
 * Start a child process to compile a script with the given compiler and args.
 *
 * Call Rust inside.
 *
 * @param compilerPath
 * @param args
 * @param scriptName
 * @param from
 */
export const invokeCompileScript = async (compilerPath: string, args: string[], scriptName: string, from: string) => {
  const res = await Result.wrapAsync(
    async () => await invoke<string>('compile_script', { compilerPath, args, scriptName, from }),
  )

  return res.mapErr((reason) => {
    // should return fatal error only because compiler path does not exist or is not executable or something like that
    return new Error(`fatal error compile script, error given: ${reason}`)
  })
}
