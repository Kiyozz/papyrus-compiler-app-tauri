/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Typography from '@mui/material/Typography'
import { PropsWithChildren } from "react";

const H1 = ({ children }: PropsWithChildren) => (
  <Typography component="h1" gutterBottom variant="h3">
    {children}
  </Typography>
)

export default H1
