/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { KeyboardEvent } from 'react'

type SupportedKeys = 'Enter'

export const useKey = <T extends SupportedKeys>(
  key: T,
  onKey: (evt: Omit<KeyboardEvent, 'key'> & { key: T }) => void,
) => {
  return (evt: KeyboardEvent) => {
    if (evt.key === key) {
      onKey(evt as Omit<KeyboardEvent, 'key'> & { key: T })
    }
  }
}
