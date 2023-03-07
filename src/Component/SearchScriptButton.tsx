/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { open as openFileDialog } from '@tauri-apps/api/dialog'
import SearchIcon from '@mui/icons-material/Search'
import Button, { type ButtonProps } from '@mui/material/Button'
import { useListenFileDrop } from 'App/Hook/UseListenFileDrop'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { pathsToFileScriptAndFilterPscFile } from 'App/Lib/PathsToFileScriptAndFilterPscFile'
import { fromNullable } from 'App/Lib/TsResults'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { None, Some } from 'ts-results'

const SearchScriptButton = forwardRef<
  HTMLButtonElement,
  { onFileSelect: (files: FileScript[], reason: 'Drop' | 'Select') => void } & Omit<ButtonProps, 'ref'>
>(({ onFileSelect, disabled = false, ...props }, ref) => {
  const { t } = useTranslation()
  useListenFileDrop({
    onDrop: (evt) => {
      const files = pathsToFileScriptAndFilterPscFile(evt.payload)

      onFileSelect(files, 'Drop')
    },
  })

  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <Button
      startIcon={<SearchIcon />}
      disabled={disabled || isDialogOpen}
      onClick={() => {
        setDialogOpen(true)
        openFileDialog({
          title: t('common.papyrusFileSelectDialog.title'),
          filters: [
            {
              name: 'Papyrus Script',
              extensions: ['psc'],
            },
          ],
          directory: false,
          multiple: true,
        })
          .then((files) => {
            const scripts = fromNullable(files as string[] | null)
              .map(pathsToFileScriptAndFilterPscFile)
              .andThen((files) => (is.nonEmptyArray(files) ? Some(files) : None))

            if (scripts.some) {
              onFileSelect(scripts.unwrap(), 'Select')
            }
          })
          .finally(() => {
            setDialogOpen(false)
          })
      }}
      ref={ref}
      {...props}
    />
  )
})

SearchScriptButton.displayName = 'SearchScriptButton'

export default SearchScriptButton
