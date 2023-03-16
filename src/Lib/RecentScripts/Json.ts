/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { RecentScriptsZod } from 'App/Lib/Conf/ConfZod'
import { parseSafeJson } from 'App/Lib/Json'

export const parseRecentScriptsJson = (text: string) => parseSafeJson(RecentScriptsZod, text)
