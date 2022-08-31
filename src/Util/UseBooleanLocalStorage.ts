/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Dispatch, SetStateAction } from 'react'
import useLocalStorage from 'react-use-localstorage'

export function useBooleanLocalStorage(
  key: string,
  initialValue: boolean,
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useLocalStorage(key, String(initialValue))

  return [
    value === 'true',
    function (setNewValue: SetStateAction<boolean>) {
      if (typeof setNewValue === 'function') {
        setValue(String(setNewValue(value === 'true')))
      } else {
        setValue(String(setNewValue))
      }
    },
  ]
}
