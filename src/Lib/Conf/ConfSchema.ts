/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type JSONSchema as TypedJSONSchema } from 'json-schema-typed'

export type ConfSchema<T> = {
  [Property in keyof T]: TypedJSONSchema
}
