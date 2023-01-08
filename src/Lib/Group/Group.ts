/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Groups } from 'App/Lib/Conf/ConfDecoder'
import { pipe, TE, TO } from 'App/Lib/FpTs'
import { GroupOptions } from 'App/Lib/Group/GroupOptions'
import { canReadGroupsFile, readGroupsFileJson } from 'App/Lib/Group/ReadGroupsFile'
import { writeGroupsFile } from 'App/Lib/Group/WriteGroupsFile'
import deepmerge from 'deepmerge'
import { PartialDeep } from 'type-fest'

const writeDefaultGroups = (options: GroupOptions) => {
  return pipe(
    canReadGroupsFile(options.fileName),
    TE.fromTask,
    TE.filterOrElse(
      (canReadGroups) => !canReadGroups,
      () => new Error('Groups file already exists'),
    ),
    TE.chain(() => writeGroupsFile(options.fileName)(options.defaults)),
    TO.fromTaskEither,
  )
}

const readGroupsOrUseDefaultGroups = (options: GroupOptions) => readGroupsFileJson(options.fileName)

const defaultOptions: GroupOptions = {
  fileName: 'groups.json',
  defaults: {},
}

export const readGroups = readGroupsOrUseDefaultGroups(defaultOptions)

export const writeGroups = (partialConfig: PartialDeep<Groups>) =>
  pipe(
    readGroups,
    TE.map((currentConfig) => deepmerge(currentConfig, partialConfig) as Groups),
    TE.chain(writeGroupsFile(defaultOptions.fileName)),
  )

await writeDefaultGroups(defaultOptions)()
