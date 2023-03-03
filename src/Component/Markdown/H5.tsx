/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Typography from '@mui/material/Typography'
import { type PropsWithChildren } from 'react'

const H5 = ({ children }: PropsWithChildren) => (
  <Typography component="h5" gutterBottom variant="h6">
    {children}
  </Typography>
)

export default H5
