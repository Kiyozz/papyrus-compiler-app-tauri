/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { isNone } from 'App/Lib/FpTs'
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
    <Dialog open={(isNone(step) || step.value === 'end') && conf.isSuccess && conf.data.tutorial.telemetry}>
      <DialogTitle>{t('common.telemetry.title')}</DialogTitle>
      <DialogContent>{t('common.telemetry.text')}</DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={() => {
            updateTelemetry(false)
          }}
        >
          {t('common.refuse')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            updateTelemetry(true)
          }}
        >
          {t('common.accept')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TelemetryDialog
