/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { join } from '@tauri-apps/api/path'
import { catchErr } from 'App/Lib/TsResults'
import deepmerge from 'deepmerge'
import { Ok, type Result } from 'ts-results'
import { type PartialDeep } from 'type-fest'
import { type ConfOptions } from 'App/Lib/Conf/ConfOptions'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { isConfFileExists, readConfigFileJson } from 'App/Lib/Conf/ReadConfigFile'
import { writeConfigFile } from 'App/Lib/Conf/WriteConfigFile'

export const confFileName = 'conf.json'

/**
 * Write the default conf if the conf file doesn't exist
 *
 * @param options
 */
const writeDefaultConfIfFileNotExists = async (options: ConfOptions<Conf>): Promise<Result<void, Error>> => {
  const notNeedWrite = (await isConfFileExists()).unwrap()

  if (notNeedWrite) {
    return Ok(undefined)
  }

  return await writeConfigFile(options.defaults)
}

const readConfigOrUseDefaultConfig = async (): Promise<Result<Conf, Error>> => {
  return await catchErr(async () => await readConfigFileJson())
}

const defaultOptions: ConfOptions<Conf> = {
  projectVersion: '2023.1',
  confName: confFileName,
  defaults: {
    game: {
      type: 'Skyrim SE',
      path: '',
    },
    compilation: {
      compilerPath: await join('Papyrus Compiler', 'PapyrusCompiler.exe'),
      flag: 'TESV_Papyrus_Flags.flg',
      concurrentScripts: 15,
      output: await join('Data', 'Scripts'),
    },
    tutorial: {
      telemetry: true,
      settings: true,
    },
    mo2: {
      use: false,
      instance: undefined,
      output: await join('overwrite', 'Scripts'),
      modsFolderRelativeToInstance: 'mods',
    },
    telemetry: {
      use: true,
    },
    theme: 'system',
    locale: 'fr',
    misc: {
      documentation: {
        reminder: true,
      },
      drawerOpen: false,
    },
    logLevel: 'error',
  },
}

export const readConfig = async () => await readConfigOrUseDefaultConfig()

export const writeConfig = async (partialConfig: PartialDeep<Conf>): Promise<Result<Conf, Error>> => {
  const conf = await readConfig()
  const finalConf = conf.map((conf) => deepmerge(conf as Partial<Conf>, partialConfig))

  if (finalConf.err) return finalConf

  await writeConfigFile(finalConf.val)

  return finalConf
}

await writeDefaultConfIfFileNotExists(defaultOptions)
