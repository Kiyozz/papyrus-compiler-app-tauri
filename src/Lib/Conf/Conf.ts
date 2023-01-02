/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { join } from '@tauri-apps/api/path'
import deepmerge from 'deepmerge'
import { PartialDeep } from 'type-fest'
import { ConfOptions } from 'App/Lib/Conf/ConfOptions'
import { Conf } from 'App/Lib/Conf/ConfDecoder'
import { readConfigFileJson } from 'App/Lib/Conf/ReadConfigFile'
import { writeConfigFile } from 'App/Lib/Conf/WriteConfigFile'
import { pipe, TE } from 'App/Lib/FpTs'

const suffixExt = (suffix: string) => (text: string) => `${text}.${suffix}`
const writeDefaultConfig = (options: ConfOptions<Conf>) =>
  pipe(
    options.defaults,
    writeConfigFile(pipe(options.configName, suffixExt('json'))),
    TE.map(() => options.defaults),
  )

const readConfigOrUseDefaultConfig = (options: ConfOptions<Conf>) =>
  pipe(
    TE.of(pipe(options.configName, suffixExt('json'))),
    TE.chain(readConfigFileJson),
    TE.alt(() => writeDefaultConfig(options)),
  )

const defaultOptions: ConfOptions<Conf> = {
  projectVersion: '7.0.0',
  configName: 'settings',
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
      mods: 'mods',
    },
    groups: [],
    telemetry: {
      use: true,
    },
    theme: 'system',
    locale: 'fr',
  },
}

export const readConfig = readConfigOrUseDefaultConfig(defaultOptions)

export const writeConfig = (partialConfig: PartialDeep<Conf>) =>
  pipe(
    readConfig,
    TE.map((currentConfig) => deepmerge(currentConfig as Partial<Conf>, partialConfig)),
    TE.chain(writeConfigFile(pipe(defaultOptions.configName, suffixExt('json')))),
  )
