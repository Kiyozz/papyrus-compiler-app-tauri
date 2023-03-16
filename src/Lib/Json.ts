/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import jsonStringify from 'safe-json-stringify'
import { Err, Ok, Result } from 'ts-results'
import { type ZodType } from 'zod'

export const parseSafeJson = <T>(decoder: ZodType<T>, text: string): Result<T, Error> => {
  return parseJson(text).andThen((json) => safeDecode(decoder, json))
}

export const safeDecode = <T>(decoder: ZodType<T>, json: unknown): Result<T, Error> => {
  const obj = decoder.safeParse(json)

  if (!obj.success) return Err(new Error(`cannot decode json, error given: ${obj.error.message}`))

  return Ok(obj.data)
}

export const parseJson = (text: string): Result<unknown, Error> =>
  Result.wrap(() => JSON.parse(text)).mapErr((reason) => new Error('cannot parse json', { cause: reason }))

export const stringify = (contents: object): Result<string, Error> =>
  Result.wrap(() => jsonStringify(contents, undefined, 2)).mapErr(
    (reason) => new Error('cannot stringify json', { cause: reason }),
  )
