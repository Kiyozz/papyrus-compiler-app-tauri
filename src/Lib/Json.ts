/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import jsonStringify from 'safe-json-stringify'
import { Err, Ok, Result } from 'ts-results'
import { type ZodType } from 'zod'

export const parseJson = <T>(decoder: ZodType<T>, text: string): Result<T, Error> => {
  return Result.wrap(() => JSON.parse(text))
    .mapErr((reason) => new Error(`Cannot parse json, error given: ${reason}`))
    .andThen((json) => {
      const obj = decoder.safeParse(json)

      if (!obj.success) return Err(new Error(`Cannot decode json, error given: ${obj.error.message}`))

      return Ok(obj.data)
    })
}

export const stringify = (contents: object): Result<string, Error> =>
  Result.wrap(() => jsonStringify(contents, undefined, 2)).mapErr(
    (reason) => new Error(`Cannot stringify json, error given: ${reason}`),
  )
