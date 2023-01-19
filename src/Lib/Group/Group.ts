/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Groups } from 'App/Lib/Conf/ConfDecoder'
import { A, pipe, R, TE, TO } from 'App/Lib/FpTs'
import { GroupOptions } from 'App/Lib/Group/GroupOptions'
import { canReadGroupsFile, readGroupsFileJson } from 'App/Lib/Group/ReadGroupsFile'
import { writeGroupsFile } from 'App/Lib/Group/WriteGroupsFile'
import { Id } from 'App/Type/Id'

const writeGroupsIfNotExists = (options: GroupOptions) => {
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

export const writeGroups = (options: GroupOptions) => (groups: Groups) =>
  pipe(
    readGroups,
    TE.map((currentGroups) => ({ ...currentGroups, ...groups })),
    TE.chain(writeGroupsFile(options.fileName)),
  )

export const writeDefaultGroups = writeGroups(defaultOptions)

export const removeGroup = (options: GroupOptions) => (groupId: Id) =>
  pipe(
    readGroups,
    TE.map((groups) =>
      pipe(
        groups,
        R.toEntries,
        A.filter(([id]) => id !== groupId),
        R.fromEntries,
      ),
    ),
    TE.chain((groups: Groups) => pipe(groups, writeGroupsFile(options.fileName))),
  )

export const removeDefaultGroup = removeGroup(defaultOptions)

await writeGroupsIfNotExists(defaultOptions)()
