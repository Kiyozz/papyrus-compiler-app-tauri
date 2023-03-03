/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type RecentScripts } from 'App/Lib/Conf/ConfDecoder'

export interface RecentScriptsOptions {
  fileName: string
  defaults: RecentScripts
  maxItems: number
}
