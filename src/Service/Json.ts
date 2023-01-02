/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ConfDecoder } from 'App/Service/Conf/ConfDecoder'
import { E, flow, pipe } from 'App/Util/FpTs'
import * as DE from 'io-ts/Decoder'

export const parseJson =
  <T>(decoder: DE.Decoder<unknown, T>) =>
  (text: string) =>
    pipe(
      E.tryCatch(
        () => JSON.parse(text),
        (reason) => new Error(`Cannot parse json, error given: ${reason}`),
      ),
      E.chainW(
        flow(
          decoder.decode,
          E.mapLeft((errors) => new Error(`Cannot decode json, error given: ${DE.draw(errors)}`)),
        ),
      ),
    )

export const parseJsonConf = parseJson(ConfDecoder)

export const stringJson = (contents: unknown): E.Either<Error, string> =>
  E.tryCatch(
    () => JSON.stringify(contents, undefined, 2),
    (reason) => new Error(`Cannot stringify json, error given: ${reason}`),
  )
