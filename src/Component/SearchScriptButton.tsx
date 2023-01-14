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
import { O, pipe } from 'App/Lib/FpTs'
import { pathsToFileScriptCompilation } from 'App/Lib/PathsToFileScriptCompilation'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function SearchScriptButton({
  onFileSelect,
  disabled,
  ...props
}: { onFileSelect: (files: FileScriptCompilation[]) => void } & ButtonProps) {
  const { t } = useTranslation()
  useListenFileDrop({
    onDrop: (evt) => pipe(evt.payload, pathsToFileScriptCompilation, onFileSelect),
  })

  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <Button
      startIcon={<SearchIcon />}
      disabled={disabled || isDialogOpen}
      onClick={() => {
        setDialogOpen(true)
        openFileDialog({
          title: t<string>('common.papyrusFileSelectDialog.title'),
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
              O.map(pathsToFileScriptCompilation),
              O.filter((files) => files.length > 0),
              O.map(onFileSelect),
            )
          })
          .finally(() => {
            setDialogOpen(false)
          })
      }}
      {...props}
    />
  )
}

export default SearchScriptButton