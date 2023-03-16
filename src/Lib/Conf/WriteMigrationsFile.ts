/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { getVersion } from '@tauri-apps/api/app'
import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { type Migrations } from 'App/Lib/Conf/ReadMigrationsFile'
import { stringify } from 'App/Lib/Json'
import { Result } from 'ts-results'

export const writeMigrationsFile = async (migrations: Migrations) => {
  const migrationsAsString = stringify(migrations).expect('cannot stringify migrations')

  return await Result.wrapAsync(async () => {
    await writeTextFile('migrations.json', migrationsAsString, { dir: BaseDirectory.App })
  })
}

export const writeMigrationsWithCurrentVersion = async () => {
  const currentVersion = await getVersion()

  return await writeMigrationsFile({
    version: currentVersion,
  })
}
