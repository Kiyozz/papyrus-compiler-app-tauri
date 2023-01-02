/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { E, flow, pipe } from 'App/Lib/FpTs'
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

export const stringJson = (contents: unknown): E.Either<Error, string> =>
  E.tryCatch(
    () => JSON.stringify(contents, undefined, 2),
    (reason) => new Error(`Cannot stringify json, error given: ${reason}`),
  )
