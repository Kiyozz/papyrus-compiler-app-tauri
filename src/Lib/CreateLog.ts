/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { invoke } from '@tauri-apps/api/tauri'
import { type LogLevel } from 'App/Lib/Conf/ConfZod'
import { stringify } from 'App/Lib/Json'
import { Result } from 'ts-results'

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
  () => {
    const json = stringify(args).unwrap()

    void Result.wrapAsync(async () => {
      await invoke('log', { ns, message, level, args: json })
    })
      .then((res) => res.mapErr((reason) => new Error(`cannot call log command. error given: ${reason}`)))
      .then((res) => {
        res.err && console.error(res.val)
      })
  }
