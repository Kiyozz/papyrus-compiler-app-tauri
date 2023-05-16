/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type GroupWithId } from 'App/Type/GroupWithId'
import cx from 'classnames'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type Option } from 'ts-results'
import * as Dialog from 'App/Component/UI/Dialog'
import * as Button from 'App/Component/UI/Button'

const RemovingGroupDialog = ({
  groupToRemove,
  onConfirm,
  onCancel,
  className,
  ...props
}: Omit<Dialog.DialogProps, 'onClose'> & {
  groupToRemove: Option<GroupWithId>
  onConfirm: () => void
  onCancel: () => void
}) => {
  const { t } = useTranslation()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog.Root
      onClose={onCancel}
      className={cx('w-full max-w-xl', className)}
      initialFocus={cancelButtonRef}
      {...props}
    >
      <Dialog.Title>{t('dialog.group.removing.title')}</Dialog.Title>
      <Dialog.Content asChild>
        <p className="grow px-6 py-4">
          {t('dialog.group.removing.content', groupToRemove.map((g) => ({ name: g.name })).unwrapOr({}))}
        </p>
      </Dialog.Content>
      <Dialog.Actions className="flex justify-end gap-x-4">
        <Button.Root ref={cancelButtonRef} onClick={onCancel} color="inherit" variant="secondary">
          {t('common.cancel')}
        </Button.Root>
        <Button.Root color="error" onClick={onConfirm}>
          {t('common.remove')}
        </Button.Root>
      </Dialog.Actions>
    </Dialog.Root>
  )
}

export default RemovingGroupDialog
