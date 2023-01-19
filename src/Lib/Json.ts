/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { E, flow, J, pipe } from 'App/Lib/FpTs'
import { D } from 'App/Lib/IoTs'

export const parseAndDecode =
  <T>(decoder: D.Decoder<unknown, T>) =>
  (text: string) =>
    pipe(
      J.parse(text),
      E.chainW(
        flow(
          decoder.decode,
          E.mapLeft((errors: D.DecodeError) => new Error(`Cannot decode json, error given: ${D.draw(errors)}`)),
        ),
      ),
    )

export const stringify = (contents: unknown): E.Either<Error, string> =>
  E.tryCatch(
    () => JSON.stringify(contents, undefined, 2),
    (reason) => new Error(`Cannot stringify json, error given: ${reason}`),
  )
