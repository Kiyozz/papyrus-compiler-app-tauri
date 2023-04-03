/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import is from '@sindresorhus/is'
import { open as openFileDialog } from '@tauri-apps/api/dialog'
import Button, { type ButtonProps } from 'App/Component/UI/Button'
import { useListenFileDrop } from 'App/Hook/UseListenFileDrop'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { pathsToFileScriptAndFilterPscFile } from 'App/Lib/PathsToFileScriptAndFilterPscFile'
import { fromNullable } from 'App/Lib/TsResults'
import { forwardRef, type Ref, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { None, Some } from 'ts-results'

function SearchScriptButtonRoot(
  {
    onFileSelect,
    disabled = false,
    ...props
  }: { onFileSelect: (files: FileScript[], reason: 'Drop' | 'Select') => void } & ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
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
      startIcon={<MagnifyingGlassIcon />}
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
}

SearchScriptButtonRoot.displayName = 'SearchScriptButton'

const SearchScriptButton = forwardRef(SearchScriptButtonRoot) as typeof SearchScriptButtonRoot

export default SearchScriptButton
