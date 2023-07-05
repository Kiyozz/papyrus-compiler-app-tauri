/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import is from '@sindresorhus/is'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import * as Dialog from 'App/Component/UI/Dialog'
import * as EmptyState from 'App/Component/UI/EmptyState'
import * as Button from 'App/Component/UI/Button'
import Input from 'App/Component/UI/Input'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { GroupZod } from 'App/Lib/Form/GroupForm'
import { enterPageAnimate, fadeAnimate } from 'App/Lib/Framer'
import { type GroupWithId } from 'App/Type/GroupWithId'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { type Option } from 'ts-results'

function CreateOrEditGroupDialog({
  group,
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  defaultScripts,
  ...props
}: Omit<Dialog.DialogProps, 'onSubmit' | 'onKeyDown' | 'children' | 'className' | 'onLeaveEnd'> & {
  group: Option<GroupWithId>
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => Promise<void>
  actionsDisabled: boolean
  actionsIsLoading: boolean
  defaultScripts: Option<FileScript[]>
}) {
  const { trackEvent } = useMatomo()
  const {
    scripts,
    add: addScripts,
    remove: removeScripts,
    clear: clearScripts,
    replaceAll: replaceScripts,
  } = useScriptsList({
    initialScripts: group.map((g) => g.scripts).unwrapOr([] as FileScript[]),
  })
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: group.map((g) => ({ name: g.name })).unwrapOr(undefined),
    resolver: zodResolver(GroupZod),
  })

  useEffect(() => {
    if (group.some) {
      replaceScripts(group.val.scripts)
      reset({
        name: group.val.name,
      })
    }
  }, [clearScripts, group, replaceScripts, reset])

  const resetDialog = () => {
    reset({
      name: '',
    })
    clearScripts()
  }

  return (
    <Dialog.Root onClose={onClose} fullScreen asChild onLeaveEnd={resetDialog} {...props}>
      <form
        className="flex h-full flex-col"
        onSubmit={handleSubmit((data, evt) => {
          evt?.stopPropagation()

          const name = data.name

          if (is.emptyString(name)) return

          void onSubmit(scripts, name)
        })}
      >
        <Dialog.Title>
          <Input autoComplete="off" placeholder={t('dialog.group.name.label')} {...register('name')} />
        </Dialog.Title>
        <Dialog.Content>
          <AnimatePresence mode="wait" initial={false}>
            {is.nonEmptyArray(scripts) ? (
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
            <Button.Root ref={closeButtonRef} disabled={actionsDisabled} onClick={onClose} variant="secondary">
              {t('common.cancel')}
            </Button.Root>
            <Button.Root
              type="submit"
              disabled={actionsDisabled || actionsIsLoading || !formState.isValid}
              color="inherit"
            >
              <AnimatePresence>
                {actionsIsLoading && (
                  <motion.span {...fadeAnimate}>
                    <Button.Icon edge="start" className="animate-spin">
                      <ArrowPathIcon />
                    </Button.Icon>
                  </motion.span>
                )}
              </AnimatePresence>
              {group.some ? t('common.edit') : t('common.create')}
            </Button.Root>
          </div>
        </Dialog.Actions>
      </form>
    </Dialog.Root>
  )
}

export default CreateOrEditGroupDialog
