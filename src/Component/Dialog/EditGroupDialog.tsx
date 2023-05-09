/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import is from '@sindresorhus/is'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import Input from 'App/Component/UI/Input'
import { useKey } from 'App/Hook/UseKey'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { GroupZod } from 'App/Lib/Form/GroupForm'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { enterPageAnimate } from 'App/Lib/Framer'
import { type GroupWithId } from 'App/Type/GroupWithId'
import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { None, type Option } from 'ts-results'
import * as Dialog from 'App/Component/UI/Dialog'
import * as EmptyState from 'App/Component/UI/EmptyState'
import * as Button from 'App/Component/UI/Button'

const EditGroupDialog = ({
  group = None,
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  ...props
}: Omit<Dialog.DialogProps, 'onSubmit' | 'onKeyDown'> & {
  group: Option<GroupWithId>
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => Promise<void>
  actionsDisabled?: boolean
  actionsIsLoading?: boolean
}) => {
  const { trackEvent } = useMatomo()
  const {
    scripts,
    add: addScripts,
    remove: removeScripts,
    clear: clearScripts,
  } = useScriptsList({
    initialScripts: group.map((g) => g.scripts).unwrapOr([] as FileScript[]),
  })
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const onDialogPressEnter = useKey('Enter', () => {
    if (actionsDisabled || actionsIsLoading || !formState.isValid) {
      return
    }

    const name = getValues('name')

    if (is.emptyString(name)) return

    onSubmit(scripts, name).finally(resetDialog)
  })

  const { t } = useTranslation()
  const { register, reset, handleSubmit, formState, getValues } = useForm({
    defaultValues: group.map((g) => ({ name: g.name })).unwrapOr(undefined),
    resolver: zodResolver(GroupZod),
  })

  useLayoutEffect(() => {
    if (group.some) {
      const g = group.val

      reset({
        name: g.name,
      })
      clearScripts()
      addScripts(g.scripts)
    }
  }, [addScripts, clearScripts, group, reset])

  const resetDialog = () => {
    reset()
    clearScripts()
  }

  const handleDialogClose = () => {
    onClose()
  }

  return (
    <Dialog.Root onClose={handleDialogClose} onKeyDown={onDialogPressEnter} fullScreen asChild {...props}>
      <form
        className="flex h-full flex-col"
        onSubmit={handleSubmit((data) => {
          const name = data.name

          if (is.emptyString(name)) return

          onSubmit(scripts, name).finally(resetDialog)
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
            {t('common.edit')}
          </Button.Root>
        </Dialog.Actions>
      </form>
    </Dialog.Root>
  )
}

export default EditGroupDialog
