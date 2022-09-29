/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import type { ConfMigrations } from 'App/Service/Conf/ConfMigrations'
import type { ConfSchema } from 'App/Service/Conf/ConfSchema'

export type ConfOptions<T extends Record<string, any>> = {
  readonly projectVersion: string
  readonly configName: string
  readonly defaults?: Readonly<T>
  readonly schema?: ConfSchema<T>
  readonly migrations?: ConfMigrations<T>

  /**
   * @default value => JSON.stringify(value, null, '\t')
   */
  readonly serialize?: (data: T) => string
  /**
   * @default JSON.parse
   */
  readonly deserialize?: (data: string) => T
}
