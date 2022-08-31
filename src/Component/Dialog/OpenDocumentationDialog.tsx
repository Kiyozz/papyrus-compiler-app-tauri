/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
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
import { useBooleanLocalStorage } from 'App/Util/UseBooleanLocalStorage'
import React from 'react'
import { useTranslation } from 'react-i18next'

function OpenDocumentationDialog(props: Omit<DialogProps, 'onKeyDown' | 'onClose' | 'open'>) {
  const { t } = useTranslation()
  const {
    dialogs: {
      openDocumentation: [isOpen, setOpen],
    },
  } = useApp()
  const { open: openTheDocumentation } = useDocumentation()
  const [isShowDialog, setRememberDocumentationDialog] = useBooleanLocalStorage('showOpenDocumentationDialog', true)

  const onDialogKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      openTheDocumentation('enter')
      onClose()
    }
  }

  const toggleRememberDocumentationDialog = () => {
    setRememberDocumentationDialog((v) => !v)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)} onKeyDown={onDialogKeyDown} {...props}>
      <DialogTitle>{t('dialog.open-documentation.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('dialog.open-documentation.text')}</DialogContentText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={!isShowDialog}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={toggleRememberDocumentationDialog}
              />
            }
            label={t('dialog.open-documentation.actions.doNotShowAgain')}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={onClose} color="inherit" autoFocus>
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OpenDocumentationDialog
