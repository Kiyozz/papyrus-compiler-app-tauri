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

export const useLog =
  (ns: string) =>
  (message: string, level: LogLevel, ...args: unknown[]) =>
  async (): Promise<void> => {
    console.log(args)
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
