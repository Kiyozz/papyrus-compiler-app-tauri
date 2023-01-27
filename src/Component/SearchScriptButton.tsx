/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open as openFileDialog } from '@tauri-apps/api/dialog'
import SearchIcon from '@mui/icons-material/Search'
import Button, { ButtonProps } from '@mui/material/Button'
import { useListenFileDrop } from 'App/Hook/UseListenFileDrop'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { O, pipe } from 'App/Lib/FpTs'
import { pathsToFileScript } from 'App/Lib/PathsToFileScript'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SearchScriptButton = forwardRef<
  HTMLButtonElement,
  { onFileSelect: (files: FileScript[]) => void } & Omit<ButtonProps, 'ref'>
>(({ onFileSelect, disabled, ...props }, ref) => {
  const { t } = useTranslation()
  useListenFileDrop({
    onDrop: (evt) => pipe(evt.payload, pathsToFileScript, onFileSelect),
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
            pipe(
              files as string[] | null,
              O.fromNullable,
              O.map(pathsToFileScript),
              O.filter((files) => files.length > 0),
              O.map(onFileSelect),
            )
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

export default SearchScriptButton
