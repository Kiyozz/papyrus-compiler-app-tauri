/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { parseGroupsJson } from 'App/Lib/Group/Json'
import { Result } from 'ts-results'

export const readGroupsFile = async (path: string): Promise<Result<string, Error>> => {
  return await Result.wrapAsync(async () => await readTextFile(path, { dir: BaseDirectory.App })).then((res) =>
    res.mapErr((reason) => new Error(`cannot read groups file, error given: ${reason}`)),
  )
}

export const isGroupsFileExists = async (path: string): Promise<Result<boolean, Error>> =>
  await Result.wrapAsync(async () => await exists(path, { dir: BaseDirectory.App }))

export const readGroupsFileJson = async (path: string) => {
  return await readGroupsFile(path).then((file) =>
    file
      .andThen(parseGroupsJson)
      .mapErr((reason) => new Error('cannot parse groups file, error given', { cause: reason })),
  )
}
