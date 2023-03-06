/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { type RecentScripts } from 'App/Lib/Conf/ConfZod'
import { stringify } from 'App/Lib/Json'
import { Result } from 'ts-results'

export const writeRecentScriptsFile = async (path: string, contents: RecentScripts): Promise<Result<void, Error>> => {
  const asStringJson = stringify(contents).unwrap()

  const res = await Result.wrapAsync(async () => {
    await writeTextFile({ path, contents: asStringJson }, { dir: BaseDirectory.App })
  })

  return res.mapErr((reason) => new Error(`Cannot write recent scripts file, error given: ${reason}`))
}
