/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { open as openDialog } from '@tauri-apps/api/dialog'
import FormControl, { type FormControlProps } from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput, { type OutlinedInputProps } from '@mui/material/OutlinedInput'
import React, { forwardRef, type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import FolderIcon from '@mui/icons-material/Folder'

const TextFieldDialog = forwardRef<
  HTMLDivElement,
  Omit<FormControlProps, 'onChange' | 'ref'> & {
    label: ReactNode
    defaultValue: string
    outlinedInputProps?: OutlinedInputProps
    onChange?: (newValue: string) => void
    type: 'folder' | 'file'
  }
>(({ label, outlinedInputProps, onChange, defaultValue, type, placeholder, ...props }, ref) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(defaultValue)
  const [isHover, setHover] = useState(false)

  const onClickInput = async (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.currentTarget.blur()
    setHover(false)

    const result = await openDialog({
      directory: type === 'folder',
      filters: [
        {
          name: 'PapyrusCompiler',
          extensions: ['exe'],
        },
      ],
    })

    if (is.nonEmptyString(result)) {
      setValue(result)
      onChange?.(result)
    }
  }

  return (
    <FormControl fullWidth variant="outlined" {...props} ref={ref}>
      <InputLabel className="flex items-center" htmlFor={outlinedInputProps?.id}>
        {label}
      </InputLabel>
      <OutlinedInput
        classes={{
          inputSizeSmall: 'text-xs',
        }}
        id={outlinedInputProps?.id}
        label={label}
        onChange={(evt) => {
          const newValue = evt.currentTarget.value

          setValue(newValue)
          onChange?.(newValue)
        }}
        placeholder={placeholder ?? t('common.select.folder')}
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              edge="start"
              onClick={onClickInput}
              onMouseEnter={() => {
                setHover(true)
              }}
              onMouseLeave={() => {
                setHover(false)
              }}
              color={props.error === true ? 'error' : 'inherit'}
            >
              {isHover ? <FolderOpenIcon /> : <FolderIcon />}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        {...outlinedInputProps}
      />
    </FormControl>
  )
})

TextFieldDialog.displayName = 'TextFieldDialog'

export default TextFieldDialog
