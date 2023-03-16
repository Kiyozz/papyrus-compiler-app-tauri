/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { writeMigrationsWithCurrentVersion } from 'App/Lib/Conf/WriteMigrationsFile'
import { parseSafeJson } from 'App/Lib/Json'
import { Result } from 'ts-results'
import { z } from 'zod'

const MigrationsZod = z.object({
  version: z.string(),
})

export type Migrations = z.infer<typeof MigrationsZod>

export const readMigrationsFile = async (): Promise<Result<Migrations, Error>> => {
  const isMigrationsFileExists = await exists('migrations.json', { dir: BaseDirectory.App })

  if (!isMigrationsFileExists) {
    await writeMigrationsWithCurrentVersion()
  }

  return (await Result.wrapAsync(async () => await readTextFile('migrations.json', { dir: BaseDirectory.App })))
    .mapErr((reason) => new Error('cannot read migrations.json', { cause: reason }))
    .andThen((content) => parseSafeJson(MigrationsZod, content))
}
