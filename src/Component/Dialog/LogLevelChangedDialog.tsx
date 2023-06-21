/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import * as Button from 'App/Component/UI/Button'
import * as Dialog from 'App/Component/UI/Dialog'
import { useTranslation } from 'react-i18next'

const LogLevelChangedDialog = ({
  open,
  onRestartLater,
  onRestartNow,
}: {
  open: boolean
  onRestartLater: () => void
  onRestartNow: () => void
}) => {
  const { t } = useTranslation()

  return (
    <Dialog.Root className="w-full max-w-xl" open={open} onClose={onRestartLater}>
      <Dialog.Title>{t('dialog.logLevelChanged.title')}</Dialog.Title>
      <Dialog.Content className="px-6 py-4">{t('dialog.logLevelChanged.content')}</Dialog.Content>
      <Dialog.Actions className="flex justify-end space-x-4">
        <Button.Root color="inherit" variant="secondary" onClick={onRestartLater}>
          {t('common.restartLater')}
        </Button.Root>
        <Button.Root onClick={onRestartNow}>{t('common.restartNow')}</Button.Root>
      </Dialog.Actions>
    </Dialog.Root>
  )
}

export default LogLevelChangedDialog
