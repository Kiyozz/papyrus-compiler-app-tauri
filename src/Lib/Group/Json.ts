/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GroupsZod } from 'App/Lib/Conf/ConfZod'
import { parseSafeJson } from 'App/Lib/Json'

export const parseGroupsJson = (contents: string) => parseSafeJson(GroupsZod, contents)
