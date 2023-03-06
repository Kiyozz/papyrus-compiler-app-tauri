/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ConfZod } from 'App/Lib/Conf/ConfZod'
import { parseJson } from 'App/Lib/Json'

export const parseConfJson = (contents: string) => parseJson(ConfZod, contents)
