/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { open as openDialog } from '@tauri-apps/api/dialog'
import Button from 'App/Component/UI/Button'
import Input from 'App/Component/UI/Input'
import { motion } from 'framer-motion'
import React, { type ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { FolderIcon, FolderArrowDownIcon } from '@heroicons/react/24/solid'

const MotionInput = motion(Input)

const InputDialog = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof MotionInput>, 'onChange' | 'value'> & {
    defaultValue: string
    onChange?: (newValue: string) => void
    type: 'folder' | 'file'
  }
>(({ onChange, defaultValue, type, ...props }, ref) => {
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
    <MotionInput
      leadingAddon={
        <Button
          variant="link"
          disabled={props.disabled}
          className="-mx-3 flex-1 rounded-r-none px-3 hover:bg-gray-50 group-aria-disabled:pointer-events-none"
          color={(typeof props.error === 'boolean' ? props.error : props.error != null) ? 'error' : undefined}
          onClick={onClickInput}
          onMouseEnter={() => {
            setHover(true)
          }}
          onMouseLeave={() => {
            setHover(false)
          }}
          startIcon={isHover ? <FolderArrowDownIcon /> : <FolderIcon />}
        />
      }
      ref={ref}
      value={value}
      onChange={(evt) => {
        const newValue = evt.currentTarget.value

        setValue(newValue)
        onChange?.(newValue)
      }}
      {...props}
    />
  )
  /*
  return (
    <MotionFormControl fullWidth variant="outlined" {...props} ref={ref}>
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
    </MotionFormControl>
  ) */
})

InputDialog.displayName = 'TextFieldDialog'

export default InputDialog
