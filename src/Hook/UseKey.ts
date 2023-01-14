/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { KeyboardEvent } from 'react'

type SupportedKeys = 'Enter'

export const useKey = (key: SupportedKeys, { onEnter }: { onEnter: () => void }) => {
  return (evt: KeyboardEvent) => {
    if (evt.key === key) {
      onEnter()
    }
  }
}
