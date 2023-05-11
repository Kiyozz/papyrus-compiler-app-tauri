/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type PropsWithChildren } from 'react'

const Code = ({ children }: PropsWithChildren) => (
  <code className="m-0 rounded px-[0.4em] py-[0.2em] text-[85%] dark:bg-gray-800">{children}</code>
)

export default Code
