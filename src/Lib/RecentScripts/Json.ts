/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { RecentScriptsDecoder } from 'App/Lib/Conf/ConfDecoder'
import { parseAndDecode } from 'App/Lib/Json'

export const parseAndDecodeRecentScripts = parseAndDecode(RecentScriptsDecoder)
