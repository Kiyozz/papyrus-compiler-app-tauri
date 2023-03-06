import { None, type Option, Result, Some, OkImpl, ErrImpl } from 'ts-results'

declare module 'ts-results' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ErrImpl<E> {
    q: () => never
  }

  interface OkImpl<T> {
    q: () => T
  }
}

OkImpl.prototype.q = function () {
  return this.val
}

ErrImpl.prototype.q = function () {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw this
}

export function fromNullable<T>(val: T | undefined | null): Option<T> {
  return val == null ? None : Some(val)
}

export function catchErr<
  Value,
  E = unknown,
  CB extends (() => Result<Value, E>) | (() => Promise<Result<Value, E>>) = () => Result<Value, E>,
>(
  callback: CB,
): CB extends () => Result<infer R, infer E>
  ? Result<R, E>
  : CB extends () => Promise<Result<infer R, infer E>>
  ? Promise<Result<R, E>>
  : never {
  const handleError = (error: unknown) => {
    if (Result.isResult(error)) {
      return error
    }

    throw error
  }

  try {
    const res = callback() as any

    if (res instanceof Promise) {
      return res.catch(handleError) as any
    }

    return res
  } catch (error) {
    return handleError(error) as any
  }
}
