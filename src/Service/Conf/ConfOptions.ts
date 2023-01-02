/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import type { ConfMigrations } from 'App/Service/Conf/ConfMigrations'

export type ConfRecord<T extends Record<string, any>> = Record<string, unknown>

export type ConfOptions<T = unknown> = {
  readonly projectVersion: string
  readonly configName: string
  readonly defaults: T
  readonly migrations?: ConfMigrations<any>
}
