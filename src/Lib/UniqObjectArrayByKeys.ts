/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export const uniqObjectArrayByKeys =
  <T>(arrayInput: T[] = []) =>
  (keys: Array<keyof T> = []): T[] => {
    if (!Array.isArray(arrayInput)) {
      throw new TypeError(`Expected an array for arrayInput, got ${typeof arrayInput}`)
    }

    if (!Array.isArray(keys)) {
      throw new TypeError(`Expected an array for keys, got ${typeof keys}`)
    }

    const keyValues = arrayInput.map((value): [keyof T, T] => {
      const key = keys.map((k) => value[k]).join('|') as keyof T
      return [key, value]
    })

    const kvMap = new Map<keyof T, T>(keyValues)

    return [...kvMap.values()]
  }
