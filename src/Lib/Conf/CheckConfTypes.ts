/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { match, P } from 'ts-pattern'
import { CheckConfError } from './CheckConf'

export type CheckConfErrorTypes =
  | 'gamePathDoesNotExist'
  | 'gameExeDoesNotExist'
  | 'compilerPathDoesNotExist'
  | 'compilerPathIsNotAFile'
  | 'mo2InstanceIsNotSet'
  | 'mo2InstanceDoesNotExist'
  | 'mo2InstanceNoModsFolder'
  | 'creationKitScriptDoesNotExist'
  | 'fatalError'

export const isCheckConfError = (value: unknown): value is CheckConfError => {
  return match(value)
    .with({ type: P.select(), message: P.string }, (type) => {
      return isCheckConfErrorTypes(type)
    })
    .otherwise(() => false)
}

export const isCheckConfErrorTypes = (value: unknown): value is CheckConfErrorTypes =>
  match(value)
    .with(
      P.union(
        'gamePathDoesNotExist',
        'gameExeDoesNotExist',
        'compilerPathDoesNotExist',
        'compilerPathIsNotAFile',
        'mo2InstanceIsNotSet',
        'mo2InstanceDoesNotExist',
        'mo2InstanceNoModsFolder',
        'creationKitScriptDoesNotExist',
        'fatalError',
      ),
      () => true,
    )
    .otherwise(() => false)

export const isCheckConfErrorGamePathDoesNotExist = (value: unknown): value is CheckConfError =>
  value === ('gamePathDoesNotExist' satisfies CheckConfErrorTypes)

export const isCheckConfErrorGameExeDoesNotExist = (value: unknown): value is CheckConfError =>
  value === ('gamePathDoesNotExist' satisfies CheckConfErrorTypes)

export const isCheckConfErrorCompilerPathDoesNotExist = (value: unknown): value is CheckConfError =>
  value === ('compilerPathDoesNotExist' satisfies CheckConfErrorTypes)

export const isCheckConfErrorMo2InstanceIsNotSet = (value: unknown): value is CheckConfError =>
  value === ('mo2InstanceIsNotSet' satisfies CheckConfErrorTypes)

export const isCheckConfErrorMo2InstanceDoesNotExist = (value: unknown): value is CheckConfError =>
  value === ('mo2InstanceDoesNotExist' satisfies CheckConfErrorTypes)

export const isCheckConfErrorMo2InstanceNoModsFolder = (value: unknown): value is CheckConfError =>
  value === ('mo2InstanceNoModsFolder' satisfies CheckConfErrorTypes)
