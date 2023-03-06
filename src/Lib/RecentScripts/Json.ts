/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { RecentScriptsZod } from 'App/Lib/Conf/ConfZod'
import { parseJson } from 'App/Lib/Json'

export const parseRecentScriptsJson = (text: string) => parseJson(RecentScriptsZod, text)
