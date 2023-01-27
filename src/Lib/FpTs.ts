/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export {
  pipe,
  flow,
  constant,
  identity,
  constFalse,
  constTrue,
  constNull,
  constUndefined,
  constVoid,
} from 'fp-ts/function'
export * as T from 'fp-ts/Task'
export * as TE from 'fp-ts/TaskEither'
export * as TO from 'fp-ts/TaskOption'
export * as O from 'fp-ts/Option'
export * as E from 'fp-ts/Either'
export * as A from 'fp-ts/Array'
export * as R from 'fp-ts/Record'
export * as J from 'fp-ts/Json'
export * as S from 'fp-ts/string'
export * as N from 'fp-ts/number'
export * as B from 'fp-ts/boolean'
export * as IO from 'fp-ts/IO'
export * as IOE from 'fp-ts/IOEither'
export * as NEA from 'fp-ts/NonEmptyArray'
export * as ORD from 'fp-ts/Ord'
export * as RA from 'fp-ts/ReadonlyArray'
export * as RTE from 'fp-ts/ReaderTaskEither'
export * as C from 'fp-ts/Console'
export { some, none, isSome, isNone } from 'fp-ts/Option'
export type { Option } from 'fp-ts/Option'
export { right, left, isRight, isLeft } from 'fp-ts/Either'
export type { Either } from 'fp-ts/Either'
