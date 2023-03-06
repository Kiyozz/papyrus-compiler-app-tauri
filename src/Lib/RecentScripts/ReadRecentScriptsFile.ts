/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { parseRecentScriptsJson } from 'App/Lib/RecentScripts/Json'
import { Result } from 'ts-results'

export const readRecentScriptsFile = async (path: string): Promise<Result<string, Error>> => {
  const res = await Result.wrapAsync(async () => await readTextFile(path, { dir: BaseDirectory.App }))

  return res.mapErr((reason) => new Error(`Cannot read recent scripts file, error given: ${reason}`))
}

export const isRecentScriptsFileExists = async (path: string): Promise<Result<boolean, Error>> => {
  return await Result.wrapAsync(async () => await exists(path, { dir: BaseDirectory.App })).then((res) =>
    res.mapErr((reason) => new Error(`Cannot check if ${path} exists, error given: ${reason}`)),
  )
}

export const readRecentScriptsFileJson = async (path: string): Promise<Result<string[], Error>> => {
  const res = await readRecentScriptsFile(path)

  return res.andThen(parseRecentScriptsJson)
}
