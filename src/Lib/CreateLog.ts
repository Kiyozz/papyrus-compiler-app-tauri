/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { invoke } from '@tauri-apps/api/tauri'
import { LogLevel } from 'App/Lib/Conf/ConfDecoder'
import { isLeft, TE } from 'App/Lib/FpTs'
import { stringify } from 'App/Lib/Json'

export const createDebugLog = (ns: string) => createLog(ns, 'debug')
export const createTraceLog = (ns: string) => createLog(ns, 'trace')
export const createWarnLog = (ns: string) => createLog(ns, 'warn')
export const createErrorLog = (ns: string) => createLog(ns, 'error')

export const createLogs = (ns: string) => ({
  debug: createDebugLog(ns),
  trace: createTraceLog(ns),
  warn: createWarnLog(ns),
  error: createErrorLog(ns),
  log: createLog(ns),
})

export const createLog =
  (ns: string, level: LogLevel = 'info') =>
  (message: string, ...args: unknown[]) =>
  async (): Promise<void> => {
    const json = stringify(args)

    if (isLeft(json)) {
      console.log(json)
      return Promise.reject(json.left)
    }

    const res = await TE.tryCatch(
      () => invoke<void>('log', { ns, message, level, args: json.right }),
      (reason) => new Error(`cannot call log command. error given: ${reason}`),
    )()

    if (isLeft(res)) {
      console.error(res.left)
    }
  }
