/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { join } from '@tauri-apps/api/path'
import { exists } from 'App/Lib/Path'
import { Conf } from 'App/Lib/Conf/ConfDecoder'
import { toDefaultScript } from 'App/Util/ToDefaultScript'
import { toExecutable } from 'App/Util/ToExecutable'
import { toOtherSource } from 'App/Util/ToOtherSource'
import { toSource } from 'App/Util/ToSource'
import { E, O, pipe, TE } from '../FpTs'

export type CheckConfErrorTypes =
  | 'gamePathDoesNotExist'
  | 'gameSourceDoesNotExist'
  | 'gameExeDoesNotExist'
  | 'compilerPathDoesNotExist'
  | 'mo2InstanceIsNotSet'
  | 'mo2InstanceDoesNotExist'
  | 'mo2InstanceNoModsFolder'
  | 'creationKitScriptDoesNotExist'
  | 'fatalError'
export type CheckConfError = { type: CheckConfErrorTypes; message: string }

const isCheckConfError = (value: unknown): value is CheckConfError =>
  typeof value === 'object' && value !== null && 'type' in value && 'message' in value

const onRejected = (reason: unknown): CheckConfError => {
  if (isCheckConfError(reason)) {
    return reason
  }

  return {
    type: 'fatalError',
    message: `fatal error check conf, error given: ${reason}`,
  }
}

const check = (value: string, type: CheckConfErrorTypes, message: string): TE.TaskEither<CheckConfError, void> =>
  TE.tryCatch(async () => {
    if (!(await exists(value, { from: 'checkConf' }))) {
      throw {
        type,
        message,
      } satisfies CheckConfError
    }
  }, onRejected)

/**
 * Check if the game exe exists for the given conf
 * @param conf
 */
const checkGameExe = (conf: Conf) =>
  pipe(
    toExecutable(conf.game.type),
    (gameExe) => () => join(conf.game.path, gameExe),
    TE.fromTask,
    TE.chain((exeAbsolute) => check(exeAbsolute, 'gameExeDoesNotExist', `game exe does not exist: ${conf.game.path}`)),
  )

/**
 * Check if the game path exists for the given conf
 * @param conf
 */
const checkGamePath = (conf: Conf) =>
  check(conf.game.path, 'gamePathDoesNotExist', `game path does not exist: ${conf.game.path}`)

/**
 * Check if the compiler path exists for the given conf
 * @param conf
 */
const checkCompiler = (conf: Conf) =>
  check(
    conf.compilation.compilerPath,
    'compilerPathDoesNotExist',
    `compiler path does not exist: ${conf.compilation.compilerPath}`,
  )

/**
 * Check if the mo2 instance is properly configured for the given conf
 * @param conf
 */
const checkMo2 = (conf: Conf): TE.TaskEither<CheckConfError, void> =>
  pipe(
    conf.mo2.instance,
    O.fromNullable,
    O.fold(
      () => TE.left({ type: 'mo2InstanceIsNotSet', message: 'mo2 instance is not set' } satisfies CheckConfError),
      (instance) =>
        pipe(
          check(instance, 'mo2InstanceDoesNotExist', `mo2 instance does not exist: ${instance}`),
          TE.chain(() => TE.fromTask(() => join(instance, conf.mo2.modsFolderRelativeToInstance))),
          TE.chain((modsFolder) =>
            check(
              modsFolder,
              'mo2InstanceNoModsFolder',
              `mo2 instance ${conf.mo2.modsFolderRelativeToInstance} folder does not exist: ${modsFolder}`,
            ),
          ),
        ),
    ),
  )

/**
 * Check if creation kit is installed for the given conf
 *
 * Uses the game data folder
 *
 * @param conf
 */
const checkCreationKitScriptExistsInGameDataFolder = (conf: Conf) => {
  const defaultScript = toDefaultScript(conf.game.type)

  return pipe(
    () => join(conf.game.path, 'Data', toSource(conf.game.type), defaultScript),
    TE.fromTask,
    TE.chain((script) =>
      pipe(
        check(script, 'creationKitScriptDoesNotExist', `creation kit script does not exist: ${script}`),
        TE.alt(() =>
          pipe(
            () => join(conf.game.path, 'Data', toOtherSource(conf.game.type), defaultScript),
            TE.fromTask,
            TE.chain((script) =>
              check(script, 'creationKitScriptDoesNotExist', `creation kit script does not exist: ${script}`),
            ),
          ),
        ),
      ),
    ),
  )
}

// TODO: use glob to check if any mo2 mod has creation kit script
/**
 * Check if creation kit is installed for the given conf
 *
 * Uses the MO2 mods folder
 *
 * @param conf
 */
const checkCreationKitScriptExistsInMo2 = (conf: Conf) => {
  const defaultScript = toDefaultScript(conf.game.type)

  return pipe(
    () => join(conf.game.path, 'Data', toSource(conf.game.type), defaultScript),
    TE.fromTask,
    TE.chain((script) =>
      pipe(
        check(script, 'creationKitScriptDoesNotExist', `creation kit script does not exist: ${script}`),
        TE.alt(() =>
          pipe(
            () => join(conf.game.path, 'Data', toOtherSource(conf.game.type), defaultScript),
            TE.fromTask,
            TE.chain((script) =>
              check(script, 'creationKitScriptDoesNotExist', `creation kit script does not exist: ${script}`),
            ),
          ),
        ),
      ),
    ),
  )
}

const unwrap = (either: E.Either<CheckConfError, unknown>) => {
  if (E.isLeft(either)) {
    throw either.left
  }
}

/**
 * Check if the given conf is valid
 *
 * @param conf
 */
export const checkConf = (conf: Conf): TE.TaskEither<CheckConfError, Conf> =>
  TE.tryCatch(async () => {
    unwrap(
      await pipe(
        checkGamePath(conf),
        TE.chain(() => checkGameExe(conf)),
        TE.chain(() => checkCompiler(conf)),
        TE.chain(() => (conf.mo2.use ? checkMo2(conf) : TE.right(undefined))),
        TE.chain(() =>
          conf.mo2.use ? checkCreationKitScriptExistsInMo2(conf) : checkCreationKitScriptExistsInGameDataFolder(conf),
        ),
      )(),
    )

    return conf
  }, onRejected)
