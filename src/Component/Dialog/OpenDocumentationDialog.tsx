/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import * as Button from 'App/Component/UI/Button'
import * as Dialog from 'App/Component/UI/Dialog'
import Switch from 'App/Component/UI/Switch'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useDialogsStore } from 'App/Hook/UseDialogsStore'
import { useDocumentation } from 'App/Hook/UseDocumentation'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

function OpenDocumentationDialog(props: Omit<Dialog.DialogProps, 'onKeyDown' | 'onClose' | 'open'>) {
  const { t } = useTranslation()
  const { openDocumentation: isOpen, setOpenDocumentation: setOpen } = useDialogsStore()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const { open: openTheDocumentation } = useDocumentation()

  if (!isQueryNonNullable(conf)) return <>Waiting...</>

  const onDialogKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      void openTheDocumentation('enter')
      setOpen(false)
    }
  }

  const toggleRememberDocumentationDialog = () => {
    updateConf.mutate({
      misc: {
        documentation: {
          reminder: !conf.data?.misc.documentation.reminder,
        },
      },
    })
  }

  const onConfirm = () => {
    void openTheDocumentation('click')
    setOpen(false)
  }

  return (
    <Dialog.Root
      open={isOpen}
      onClose={() => {
        setOpen(false)
      }}
      onKeyDown={onDialogKeyDown}
      className="w-full max-w-xl"
      initialFocus={confirmButtonRef}
      {...props}
    >
      <Dialog.Title>{t('dialog.openDocumentation.title')}</Dialog.Title>
      <Dialog.Content className="px-6 py-4">
        <div className="prose dark:prose-invert">
          {t('dialog.openDocumentation.text')
            .split('\n')
            .map((text) => (
              <p key={text}>{text}</p>
            ))}
        </div>
      </Dialog.Content>
      <Dialog.Actions className="flex justify-between">
        <Switch
          checked={!conf.data.misc.documentation.reminder}
          onChange={toggleRememberDocumentationDialog}
          label={t('dialog.openDocumentation.actions.doNotShowAgain')}
          name="reminder"
        />

        <div className="space-x-4">
          <Button.Root
            onClick={() => {
              setOpen(false)
            }}
            color="inherit"
            variant="secondary"
          >
            {t('common.cancel')}
          </Button.Root>
          <Button.Root ref={confirmButtonRef} onClick={onConfirm}>
            {t('common.confirm')}
          </Button.Root>
        </div>
      </Dialog.Actions>
    </Dialog.Root>
  )
}

export default OpenDocumentationDialog
