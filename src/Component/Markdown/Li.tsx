/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { PropsWithChildren } from 'react'

const Li = ({ children }: PropsWithChildren) => (
  <ListItem>
    <ListItemText primary={children} />
  </ListItem>
)

export default Li
