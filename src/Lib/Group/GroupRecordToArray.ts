/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type Group } from 'App/Lib/Conf/ConfZod'
import { type GroupWithId } from 'App/Type/GroupWithId'

export const groupRecordToArray = (groups: Record<string, Group>): GroupWithId[] => {
  return Object.entries(groups).map(([id, group]) => ({ ...group, id }))
}
