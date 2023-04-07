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
import React, { type ComponentPropsWithoutRef, forwardRef, useLayoutEffect, useState } from 'react'
import { FolderIcon, FolderArrowDownIcon } from '@heroicons/react/24/solid'

const MotionInput = motion(Input)

const InputDialog = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof MotionInput>, 'onChange' | 'value'> & {
    defaultValue: string
    onChange?: (newValue: string) => void
    type: 'folder' | 'file'
    resetOnDisabled?: boolean
  }
>(({ onChange, defaultValue, resetOnDisabled = false, type, ...props }, ref) => {
  const [value, setValue] = useState(defaultValue)

  useLayoutEffect(() => {
    if (props.disabled === true && resetOnDisabled) {
      setValue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.disabled])

  const onClickInput = async (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.currentTarget.blur()

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
          className="group/button -mx-3 flex-1 rounded-r-none px-3 hover:bg-gray-50 group-aria-disabled:pointer-events-none [&_*]:delay-0"
          color={(typeof props.error === 'boolean' ? props.error : props.error != null) ? 'error' : 'default'}
          onClick={onClickInput}
          startIcon={
            <div>
              <FolderArrowDownIcon className="hidden group-hover/button:inline-block" />
              <FolderIcon className="inline-block group-hover/button:hidden" />
            </div>
          }
          // startIcon={isHover ? <FolderArrowDownIcon /> : <FolderIcon />}
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
})

InputDialog.displayName = 'TextFieldDialog'

export default InputDialog
