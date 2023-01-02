/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { E, flow, pipe } from 'App/Lib/FpTs'
import { D } from 'App/Lib/IoTs'

export const parseJson =
  <T>(decoder: D.Decoder<unknown, T>) =>
  (text: string) =>
    pipe(
      E.tryCatch(
        () => JSON.parse(text),
        (reason) => new Error(`Cannot parse json, error given: ${reason}`),
      ),
      E.chainW(
        flow(
          decoder.decode,
          E.mapLeft((errors: D.DecodeError) => new Error(`Cannot decode json, error given: ${D.draw(errors)}`)),
        ),
      ),
    )

export const stringJson = (contents: unknown): E.Either<Error, string> =>
  E.tryCatch(
    () => JSON.stringify(contents, undefined, 2),
    (reason) => new Error(`Cannot stringify json, error given: ${reason}`),
  )
