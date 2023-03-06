/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { parseConfJson } from 'App/Lib/Conf/Json'
import { Result } from 'ts-results'

export const readConfigFile = async (path: string): Promise<Result<string, Error>> =>
  await Result.wrapAsync(async () => await readTextFile(path, { dir: BaseDirectory.App })).then((res) =>
    res.mapErr((reason) => new Error(`cannot read config file, error given: ${reason}`)),
  )

export const isConfFileExists = async (path: string): Promise<Result<boolean, Error>> =>
  await Result.wrapAsync(async () => await exists(path, { dir: BaseDirectory.App })).then((res) =>
    res.mapErr((reason) => new Error(`cannot check if ${path} exists, error given: ${reason}`)),
  )

export const readConfigFileJson = async (path: string): Promise<Result<Conf, Error>> =>
  await readConfigFile(path).then((file) =>
    file.andThen(parseConfJson).mapErr((reason) => new Error('cannot parse conf file, error given', { cause: reason })),
  )
