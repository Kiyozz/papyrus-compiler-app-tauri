/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import SearchIcon from '@mui/icons-material/Search'
import Button, { ButtonProps } from '@mui/material/Button'

function SearchScriptButton(props: ButtonProps) {
  return <Button startIcon={<SearchIcon />} {...props} />
}

export default SearchScriptButton
