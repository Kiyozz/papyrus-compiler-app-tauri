/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Group } from 'App/Lib/Conf/ConfDecoder'
import { A, pipe, R } from 'App/Lib/FpTs'
import { GroupWithId } from 'App/Type/GroupWithId'

export const groupRecordToArray = (groups: Record<string, Group>): GroupWithId[] =>
  pipe(
    R.toEntries(groups),
    A.map(([id, group]) => ({ ...group, id })),
  )
