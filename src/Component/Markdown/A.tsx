/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { HTMLProps } from 'react'
import { open } from '@tauri-apps/api/shell'

const A = ({ children, href }: HTMLProps<HTMLAnchorElement>) => (
  <button
    onClick={() => {
      if (href) {
        void open(href)
      }
    }}
    type="button"
  >
    {children}
  </button>
)

export default A
