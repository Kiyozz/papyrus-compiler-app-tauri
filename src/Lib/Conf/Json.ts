/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ConfZod } from 'App/Lib/Conf/ConfZod'
import { safeDecode } from 'App/Lib/Json'

export const safeDecodeConf = (contents: unknown) => safeDecode(ConfZod, contents)
