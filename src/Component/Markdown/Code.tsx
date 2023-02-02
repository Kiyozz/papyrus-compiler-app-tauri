/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Typography from '@mui/material/Typography'
import { PropsWithChildren } from 'react'

const Code = ({ children }: PropsWithChildren) => (
  <Typography className="m-0 rounded py-[0.2em] px-[0.4em] text-[85%] dark:bg-gray-800" component="code">
    {children}
  </Typography>
)

export default Code
