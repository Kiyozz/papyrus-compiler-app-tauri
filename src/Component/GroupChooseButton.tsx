/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import AddIcon from '@mui/icons-material/Add'
import Button, { ButtonProps } from '@mui/material/Button'

function GroupChooseButton(props: ButtonProps) {
  return <Button startIcon={<AddIcon />} {...props} />
}

export default GroupChooseButton
