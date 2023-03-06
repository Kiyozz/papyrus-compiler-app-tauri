/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GroupsZod } from 'App/Lib/Conf/ConfZod'
import { parseJson } from 'App/Lib/Json'

export const parseGroupsJson = (contents: string) => parseJson(GroupsZod, contents)
