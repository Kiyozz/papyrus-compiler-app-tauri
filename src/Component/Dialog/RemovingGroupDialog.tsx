/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type GroupWithId } from 'App/Type/GroupWithId'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type Option } from 'ts-results'
import * as Dialog from 'App/Component/UI/Dialog'
import * as Button from 'App/Component/UI/Button'

const RemovingGroupDialog = ({
  groupToRemove,
  onConfirm,
  onCancel,
  ...props
}: Omit<Dialog.DialogProps, 'onClose'> & {
  groupToRemove: Option<GroupWithId>
  onConfirm: () => void
  onCancel: () => void
}) => {
  const { t } = useTranslation()

  return (
    <Dialog.Root onClose={onCancel} {...props}>
      <Dialog.Title>{t('dialog.group.removing.title')}</Dialog.Title>
      <Dialog.Content asChild>
        <p className="flex grow items-center justify-center px-4 py-12">
          {t('dialog.group.removing.content', groupToRemove.map((g) => ({ name: g.name })).unwrapOr({}))}
        </p>
      </Dialog.Content>
      <Dialog.Actions className="flex justify-end gap-x-4">
        <Button.Root onClick={onCancel} color="inherit" variant="soft">
          {t('common.cancel')}
        </Button.Root>
        <Button.Root onClick={onConfirm} color="error" variant="soft" autoFocus>
          {t('common.confirm')}
        </Button.Root>
      </Dialog.Actions>
    </Dialog.Root>
  )
}

export default RemovingGroupDialog
