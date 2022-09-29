/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { JSONSchema as TypedJSONSchema } from 'json-schema-typed'

export type ConfSchema<T> = {
  [Property in keyof T]: TypedJSONSchema
}
