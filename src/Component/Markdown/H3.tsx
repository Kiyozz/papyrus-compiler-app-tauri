/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Typography from '@mui/material/Typography'
import { PropsWithChildren } from "react";

const H3 = ({ children }: PropsWithChildren) => (
  <Typography className="mt-2" component="h3" gutterBottom variant="h5">
    {children}
  </Typography>
)

export default H3
