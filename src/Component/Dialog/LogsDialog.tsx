/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useApp } from 'App/Hook/UseApp'
import cx from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'

function LogsDialog(props: Omit<DialogProps, 'open' | 'onClose' | 'onKeyDown'>) {
  const { t } = useTranslation()
  const {
    dialogs: {
      logs: [isLogsDialogOpen, setLogsDialogOpen],
    },
  } = useApp()

  const hasNoLogs = false

  const handleDialogKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      setLogsDialogOpen(false)
    }
  }

  return (
    <Dialog
      aria-describedby="logs-content"
      aria-labelledby="logs-title"
      fullScreen
      open={isLogsDialogOpen}
      onKeyDown={handleDialogKeyDown}
      onClose={() => {
        setLogsDialogOpen(false)
      }}
      {...props}
    >
      <Toolbar className="p-0">
        <DialogTitle className="grow" id="logs-title">
          {t('dialog.logs.title')}
        </DialogTitle>
        <Button className="mr-4" disabled={hasNoLogs} onClick={() => {}} color="inherit">
          {t('common.clear')}
        </Button>
      </Toolbar>
      <DialogContent
        className={cx('flex flex-col gap-4', hasNoLogs && 'items-center justify-center')}
        dividers
        id="logs-content"
      >
        <Typography component="span" variant="h5">
          {t('dialog.logs.noLogs')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => setLogsDialogOpen(false)}>
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogsDialog
