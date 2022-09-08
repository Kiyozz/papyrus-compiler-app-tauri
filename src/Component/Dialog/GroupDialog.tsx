/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { useTranslation } from 'react-i18next'

function GroupDialog(props: Omit<DialogProps, 'onKeyDown'> & { onClose: () => void; onSubmit: () => void }) {
  const { t } = useTranslation()

  const handleDialogKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      props.onSubmit()
    }
  }

  const isEdit = false
  const groupName = 'Group name'

  return (
    <Dialog
      aria-describedby="group-content"
      aria-labelledby="group-title"
      fullScreen
      onKeyDown={handleDialogKeyDown}
      {...props}
    >
      <Toolbar className="p-0">
        <DialogTitle className="grow" id="group-title">
          <TextField
            autoFocus
            fullWidth
            name="group-name"
            //onChange={onChangeName}
            placeholder={t('dialog.group.name.label')}
            value={groupName}
          />
        </DialogTitle>
      </Toolbar>
      <DialogContent className="flex items-center justify-center px-0" dividers id="group-content">
        <DialogContentText className="py-12">{t('dialog.group.dropScripts')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          //aria-disabled={isFileDialogActive}
          className="mr-auto"
          //disabled={isFileDialogActive}
          onClick={() => {
            // drop
          }}
          startIcon={<SearchIcon />}
          color="inherit"
        >
          {t('dialog.group.actions.searchScripts')}
        </Button>
        <Button onClick={() => props.onClose()} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={() => props.onClose()} color="inherit">
          {isEdit ? t('dialog.group.actions.edit') : t('dialog.group.actions.create')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GroupDialog
