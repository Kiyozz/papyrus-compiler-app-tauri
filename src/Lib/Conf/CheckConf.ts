/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { join, normalize } from '@tauri-apps/api/path'
import { createLogs } from 'App/Lib/CreateLog'
import { allExists, exists, glob, isFile } from 'App/Lib/Path'
import { type Conf } from 'App/Lib/Conf/ConfZod'
import { toDefaultScript } from 'App/Lib/ToDefaultScript'
import { toExecutable } from 'App/Lib/ToExecutable'
import { toOtherSource } from 'App/Lib/ToOtherSource'
import { toSource } from 'App/Lib/ToSource'
import { catchErr, fromNullable } from 'App/Lib/TsResults'
import { Err, Ok, type Result, None } from 'ts-results'
import { type CheckConfErrorTypes, isCheckConfError } from './CheckConfTypes'

export interface CheckConfError<T extends CheckConfErrorTypes = CheckConfErrorTypes> {
  type: T
  message: string
}

const logs = createLogs('checkConf')

const onRejected = (reason: unknown): CheckConfError => {
  if (isCheckConfError(reason)) {
    return reason
  }

  return {
    type: 'fatalError',
    message: `fatal error check conf, error given: ${reason}`,
  }
}

const checkPathsExists = async (
  value: string | string[],
  type: CheckConfErrorTypes,
  message: string,
): Promise<Result<void, CheckConfError>> => {
  const isPathsOrPathExists = (
    Array.isArray(value) ? await allExists(value, { from: 'checkConf' }) : await exists(value, { from: 'checkConf' })
  ).expect('fatal error: cannot check if path exists')

  if (!isPathsOrPathExists) {
    return Err({
      type,
      message,
    } satisfies CheckConfError)
  }

  return Ok(undefined)
}

/**
 * Check if the game exe exists for the given conf
 * @param conf
 */
const checkGameExe = async (conf: Conf): Promise<Result<void, CheckConfError>> => {
  const exe = toExecutable(conf.game.type)
  const exeAbsolute = await join(conf.game.path, exe)

  return await checkPathsExists(
    exeAbsolute,
    'gameExeDoesNotExist',
    `game exe "${exe}" does not exist in: ${conf.game.path}`,
  )
}

/**
 * Check if the game path exists for the given conf
 * @param conf
 */
const checkGamePath = async (conf: Conf): Promise<Result<void, CheckConfError>> =>
  await checkPathsExists(conf.game.path, 'gamePathDoesNotExist', `game path does not exist: ${conf.game.path}`)

/**
 * Check if the compiler path exists for the given conf
 * @param conf
 */
const checkCompiler = async (conf: Conf): Promise<Result<void, CheckConfError>> => {
  const compiler = await checkPathsExists(
    conf.compilation.compilerPath,
    'compilerPathDoesNotExist',
    `compiler path does not exist: ${conf.compilation.compilerPath}`,
  )

  if (compiler.err) return compiler

  const isPathIsFile = (await isFile(conf.compilation.compilerPath, { from: 'checkConf' })).expect(
    'fatal error: cannot check if path is a file',
  )

  if (!isPathIsFile) {
    return Err({
      type: 'compilerPathIsNotAFile',
      message: `compiler path is not a file: ${conf.compilation.compilerPath}`,
    } satisfies CheckConfError)
  }

  return Ok(undefined)
}

/**
 * Check if the mo2 instance is properly configured for the given conf
 * @param conf
 */
const checkMo2 = async (conf: Conf): Promise<Result<void, CheckConfError>> => {
  const instance = fromNullable(conf.mo2.instance)

  if (instance.none) {
    return Err({ type: 'mo2InstanceIsNotSet', message: 'mo2 instance is not set' } satisfies CheckConfError)
  }

  const mo2Exists = await checkPathsExists(
    instance.val,
    'mo2InstanceDoesNotExist',
    `mo2 instance does not exist: ${instance.val}`,
  )

  if (mo2Exists.err) return mo2Exists

  const modsFolder = await join(instance.val, conf.mo2.modsFolderRelativeToInstance)

  return await checkPathsExists(
    modsFolder,
    'mo2InstanceNoModsFolder',
    `mo2 instance ${conf.mo2.modsFolderRelativeToInstance} folder does not exist: ${modsFolder}`,
  )
}

/**
 * Check if creation kit is installed for the given conf
 *
 * Uses the game data folder
 *
 * @param conf
 */
const checkCreationKitScriptExistsInGameDataFolder = async (conf: Conf): Promise<Result<void, CheckConfError>> => {
  const defaultScript = toDefaultScript(conf.game.type)
  const defaultScriptAbsolute = await join(conf.game.path, 'Data', toSource(conf.game.type), defaultScript)
  const checkDefaultScript = await checkPathsExists(
    defaultScriptAbsolute,
    'creationKitScriptDoesNotExist',
    `creation kit script does not exist: ${defaultScriptAbsolute}`,
  )

  if (checkDefaultScript.ok) return checkDefaultScript

  const defaultOtherScriptAbsolute = await join(conf.game.path, 'Data', toOtherSource(conf.game.type), defaultScript)

  return await checkPathsExists(
    defaultOtherScriptAbsolute,
    'creationKitScriptDoesNotExist',
    `creation kit script does not exist: ${defaultOtherScriptAbsolute}`,
  )
}

/**
 * Check if creation kit is installed for the given conf
 *
 * Uses the MO2 mods folder
 *
 * @param conf
 */
const checkCreationKitScriptExistsInMo2 = async (conf: Conf): Promise<Result<void, CheckConfError | Error>> => {
  const defaultScript = toDefaultScript(conf.game.type)
  const mo2Instance = fromNullable(conf.mo2.instance)

  if (mo2Instance.none) {
    return await checkCreationKitScriptExistsInGameDataFolder(conf)
  }

  const sources = {
    sources: toSource(conf.game.type),
    otherSources: toOtherSource(conf.game.type),
  }
  const modsFolder = await join(mo2Instance.val, conf.mo2.modsFolderRelativeToInstance)
  const pathsToCheck = await Promise.all(
    [
      await join(modsFolder, '**', sources.sources, defaultScript),
      await join(modsFolder, '**', sources.otherSources, defaultScript),
      await join(mo2Instance.val, 'overwrite', sources.sources, defaultScript),
      await join(mo2Instance.val, 'overwrite', sources.otherSources, defaultScript),
    ].map(normalize),
  )

  const paths = await glob(pathsToCheck, None, { from: 'checkConf' })

  if (paths.err) return paths

  return await checkPathsExists(
    paths.val,
    'creationKitScriptDoesNotExist',
    `creation kit script does not exist: ${paths.val.join(', ')}`,
  )
}

/**
 * Check if the given conf is valid
 *
 * @param conf
 */
export const checkConf = async (conf: Conf): Promise<Result<Conf, CheckConfError>> => {
  logs.debug('checking conf', conf)()

  return (
    await catchErr(async () => {
      ;(await checkGamePath(conf)).q()
      ;(await checkGameExe(conf)).q()
      ;(await checkCompiler(conf)).q()

      if (conf.mo2.use) {
        ;(await checkMo2(conf)).q()
      }

      ;(
        await (conf.mo2.use
          ? checkCreationKitScriptExistsInMo2(conf)
          : checkCreationKitScriptExistsInGameDataFolder(conf))
      )
        .mapErr(onRejected)
        .q()

      return Ok(conf)
    })
  ).mapErr(onRejected)
}
