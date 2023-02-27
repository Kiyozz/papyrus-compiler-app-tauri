/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import jsonStringify from 'safe-json-stringify'
import { E, flow, J, pipe } from 'App/Lib/FpTs'
import { D } from 'App/Lib/IoTs'

export const parseAndDecode =
  <T>(decoder: D.Decoder<unknown, T>) =>
  (text: string) =>
    pipe(
      pipe(
        J.parse(text),
        E.mapLeft((reason) => new Error(`Cannot parse json, error given: ${reason}`)),
      ),
      E.chain(
        flow(
          decoder.decode,
          E.mapLeft((errors: D.DecodeError) => new Error(`Cannot decode json, error given: ${D.draw(errors)}`)),
        ),
      ),
    )

export const stringify = (contents: object): E.Either<Error, string> =>
  E.tryCatch(
    () => jsonStringify(contents, undefined, 2),
    (reason) => new Error(`Cannot stringify json, error given: ${reason}`),
  )
