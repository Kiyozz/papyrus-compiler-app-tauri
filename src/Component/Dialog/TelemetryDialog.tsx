/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import * as Button from 'App/Component/UI/Button'
import * as Dialog from 'App/Component/UI/Dialog'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useTranslation } from 'react-i18next'

const TelemetryDialog = () => {
  const { step } = useSettingsTutorial()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const { t } = useTranslation()

  const updateTelemetry = (accepted: boolean) => {
    updateConf.mutate({
      telemetry: {
        use: accepted,
      },
      tutorial: {
        telemetry: false,
      },
    })
  }

  return (
    <Dialog.Root
      className="w-full max-w-xl"
      open={step.some && step.val === 'end' && conf.isSuccess && conf.data.tutorial.telemetry}
    >
      <Dialog.Title>{t('common.telemetry.title')}</Dialog.Title>
      <Dialog.Content className="px-6 py-4">{t('common.telemetry.description')}</Dialog.Content>
      <Dialog.Actions className="flex justify-end space-x-4">
        <Button.Root
          color="inherit"
          variant="secondary"
          onClick={() => {
            updateTelemetry(false)
          }}
        >
          {t('common.refuse')}
        </Button.Root>
        <Button.Root
          onClick={() => {
            updateTelemetry(true)
          }}
        >
          {t('common.accept')}
        </Button.Root>
      </Dialog.Actions>
    </Dialog.Root>
  )
}

export default TelemetryDialog
