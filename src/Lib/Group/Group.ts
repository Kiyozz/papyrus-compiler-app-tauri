/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type Groups } from 'App/Lib/Conf/ConfZod'
import { type GroupOptions } from 'App/Lib/Group/GroupOptions'
import { isGroupsFileExists, readGroupsFileJson } from 'App/Lib/Group/ReadGroupsFile'
import { writeGroupsFile } from 'App/Lib/Group/WriteGroupsFile'
import { type Id } from 'App/Type/Id'
import { Ok, type Result } from 'ts-results'

const writeDefaultGroupsIfNotExists = async (options: GroupOptions): Promise<Result<void, Error>> => {
  const notNeedWrite = (await isGroupsFileExists(options.fileName)).unwrap()

  if (notNeedWrite) {
    return Ok(undefined)
  }

  return await writeGroupsFile(options.fileName, options.defaults)
}

const readGroupsOrUseDefaultGroups = async (options: GroupOptions): Promise<Result<Groups, Error>> =>
  await readGroupsFileJson(options.fileName)

const defaultOptions: GroupOptions = {
  fileName: 'groups.json',
  defaults: {},
}

export const readGroups = async () => await readGroupsOrUseDefaultGroups(defaultOptions)

export const writeGroups = async (options: GroupOptions, groups: Groups): Promise<Result<Groups, Error>> => {
  const finalGroups = (await readGroups()).map((currentGroups) => ({ ...currentGroups, ...groups }))

  if (finalGroups.err) return finalGroups

  await writeGroupsFile(options.fileName, finalGroups.val)

  return finalGroups
}

export const writeDefaultGroups = async (groups: Groups) => await writeGroups(defaultOptions, groups)

export const removeGroup = async (options: GroupOptions, groupId: Id) => {
  const currentGroups = (await readGroups()).map((groups) => {
    const newGroups = Object.entries(groups).filter(([id]) => id !== groupId)

    return Object.fromEntries(newGroups)
  })

  if (currentGroups.err) return currentGroups

  return await writeGroupsFile(options.fileName, currentGroups.val)
}

export const removeDefaultGroup = async (groupId: Id) => await removeGroup(defaultOptions, groupId)

await writeDefaultGroupsIfNotExists(defaultOptions)
