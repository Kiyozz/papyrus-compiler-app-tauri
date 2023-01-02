/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { useApp } from 'App/Hook/UseApp'
import { useDocumentation } from 'App/Hook/UseDocumentation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function OpenDocumentationDialog(props: Omit<DialogProps, 'onKeyDown' | 'onClose' | 'open'>) {
  const { t } = useTranslation()
  const {
    dialogs: {
      openDocumentation: {
        show: [isOpen, setOpen],
        doNotShowAgain: [isDoNotShowAnymoreDocumentationDialog, setDoNotShowAnymoreDocumentationDialog],
      },
    },
  } = useApp()
  const { open: openTheDocumentation } = useDocumentation()

  const onDialogKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      void openTheDocumentation('enter')
      setOpen(false)
    }
  }

  const toggleRememberDocumentationDialog = () => {
    setDoNotShowAnymoreDocumentationDialog((v) => !v)
  }

  const onConfirm = () => {
    void openTheDocumentation('click')
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)} onKeyDown={onDialogKeyDown} {...props}>
      <DialogTitle>{t('dialog.openDocumentation.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('dialog.openDocumentation.text')}</DialogContentText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDoNotShowAnymoreDocumentationDialog}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={toggleRememberDocumentationDialog}
              />
            }
            label={t('dialog.openDocumentation.actions.doNotShowAgain')}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={onConfirm} color="inherit" autoFocus>
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OpenDocumentationDialog
