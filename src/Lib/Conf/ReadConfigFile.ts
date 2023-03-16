/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs'
import { confFileName } from 'App/Lib/Conf/Conf'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { safeDecodeConf } from 'App/Lib/Conf/Json'
import { readMigrationsFile } from 'App/Lib/Conf/ReadMigrationsFile'
import { writeConfigFile } from 'App/Lib/Conf/WriteConfigFile'
import { writeMigrationsWithCurrentVersion } from 'App/Lib/Conf/WriteMigrationsFile'
import { createLogs } from 'App/Lib/CreateLog'
import { parseJson } from 'App/Lib/Json'
import { catchErr } from 'App/Lib/TsResults'
import { isNewerVersion } from 'App/Util/IsNewerVersion'
import { Ok, Result } from 'ts-results'

const logs = createLogs('ReadConfigFile')

const migrations: Record<string, (conf: Conf) => Promise<Result<Conf, Error>>> = {}

/**
 * Apply migrations to the conf — Apply each migration sequentially
 *
 * @param conf
 */
const applyMigrations = async (conf: Conf): Promise<Result<Conf, Error>> => {
  const migrationsFileRes = await readMigrationsFile()

  if (migrationsFileRes.err) {
    return migrationsFileRes
  }

  const migrationsFile = migrationsFileRes.val

  const migrationsToApply = Object.keys(migrations).filter((version) => {
    return isNewerVersion(version, migrationsFile.version)
  })

  if (migrationsToApply.length === 0) {
    return Ok(conf)
  }

  logs.log('apply migrations', migrationsToApply)

  return await catchErr(async () => {
    const newConf = await migrationsToApply.reduce(async (acc: Promise<Result<Conf, Error>>, version) => {
      return await acc
        .then((confRes) => confRes.map(async (conf) => await migrations[version](conf)))
        .then(async (migrationsRes) => await migrationsRes.q())
    }, Promise.resolve(Ok(conf)))

    if (newConf.ok) {
      ;(await writeMigrationsWithCurrentVersion()).q()
      ;(await writeConfigFile(newConf.val)).q()
    }

    return newConf
  })
}

export const readConfigFile = async (): Promise<Result<string, Error>> =>
  await Result.wrapAsync(async () => await readTextFile(confFileName, { dir: BaseDirectory.App })).then((res) =>
    res.mapErr((reason) => new Error('cannot read config file', { cause: reason })),
  )

export const isConfFileExists = async (): Promise<Result<boolean, Error>> =>
  await Result.wrapAsync(async () => await exists(confFileName, { dir: BaseDirectory.App })).then((res) =>
    res.mapErr((reason) => new Error(`cannot check if ${confFileName} exists`, { cause: reason })),
  )

export const readConfigFileJson = async (): Promise<Result<Conf, Error>> => {
  const unsafeConfFile = (
    await readConfigFile().then((file) =>
      file.andThen(parseJson).mapErr((reason) => new Error('cannot parse conf file', { cause: reason })),
    )
  ).q()

  const confRes = await applyMigrations(unsafeConfFile as Conf) // unsafeConfFile as Conf, because we know it's maybe a Conf for migrations

  return confRes.andThen(safeDecodeConf) // then be sure it's a Conf)
}
