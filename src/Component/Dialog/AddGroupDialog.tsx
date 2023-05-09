/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import Input from 'App/Component/UI/Input'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { GroupZod } from 'App/Lib/Form/GroupForm'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { enterPageAnimate } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import is from '@sindresorhus/is'
import { type Option } from 'ts-results'
import * as Button from 'App/Component/UI/Button'
import * as EmptyState from 'App/Component/UI/EmptyState'
import * as Dialog from 'App/Component/UI/Dialog'

const AddGroupDialog = ({
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  defaultScripts,
  open = false,
  ...props
}: Omit<Dialog.DialogProps, 'onSubmit' | 'onKeyDown' | 'children' | 'className'> & {
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => Promise<void>
  actionsDisabled?: boolean
  actionsIsLoading?: boolean
  defaultScripts: Option<FileScript[]>
}) => {
  const { trackEvent } = useMatomo()
  const {
    scripts,
    add: addScripts,
    remove: removeScripts,
    clear: clearScripts,
    reset: resetScripts,
  } = useScriptsList({
    initialScripts: [] as FileScript[],
  })
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (defaultScripts.some) {
      resetScripts(defaultScripts.val)
    }
  }, [defaultScripts, resetScripts])

  const { t } = useTranslation()
  const { register, reset, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(GroupZod),
  })

  const resetDialog = () => {
    reset()
    clearScripts()
  }

  const handleDialogClose = () => {
    resetDialog()
    onClose()
  }

  return (
    <Dialog.Root onClose={handleDialogClose} initialFocus={closeButtonRef} open={open} fullScreen asChild {...props}>
      <form
        onSubmit={handleSubmit((data, evt) => {
          evt?.stopPropagation()

          if (is.emptyString(data.name)) return

          onSubmit(scripts, data.name).finally(resetDialog)
        })}
      >
        <Dialog.Title>
          <Input autoComplete="off" placeholder={t('dialog.group.name.label')} {...register('name')} />
        </Dialog.Title>
        <Dialog.Content>
          <AnimatePresence mode="wait" initial={false}>
            {scripts.length > 0 ? (
              <FileScriptsList
                className="w-full"
                scripts={scripts}
                onRemove={(scriptToRemove) => {
                  removeScripts([scriptToRemove])
                }}
              />
            ) : (
              <EmptyState.Root asChild>
                <motion.div {...enterPageAnimate}>
                  <EmptyState.Icon>
                    <DocumentArrowDownIcon />
                  </EmptyState.Icon>
                  <EmptyState.Text>{t('dialog.group.dropScripts')}</EmptyState.Text>
                </motion.div>
              </EmptyState.Root>
            )}
          </AnimatePresence>
        </Dialog.Content>
        <Dialog.Actions>
          <SearchScriptButton
            className="mr-auto px-3 py-2"
            color="inherit"
            onFileSelect={(files, reason) => {
              addScripts(files)
              trackEvent({
                category: 'Group',
                action: 'Add scripts',
                name: reason,
              })
            }}
            disabled={actionsDisabled}
          >
            {t('common.searchScripts')}
          </SearchScriptButton>
          <div className="flex gap-x-4">
            <Button.Root
              ref={closeButtonRef}
              disabled={actionsDisabled}
              onClick={() => {
                handleDialogClose()
              }}
              variant="secondary"
            >
              {t('common.cancel')}
            </Button.Root>
            <Button.Root
              type="submit"
              disabled={actionsDisabled || actionsIsLoading || !formState.isValid}
              color="inherit"
              // loading={actionsIsLoading}
            >
              {t('common.create')}
            </Button.Root>
          </div>
        </Dialog.Actions>
      </form>
    </Dialog.Root>
  )
}

export default AddGroupDialog
