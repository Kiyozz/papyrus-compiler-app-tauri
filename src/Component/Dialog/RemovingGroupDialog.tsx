/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Button from '@mui/material/Button'
import Dialog, { type DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { type GroupWithId } from 'App/Type/GroupWithId'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type Option } from 'ts-results'

const RemovingGroupDialog = ({
  groupToRemove,
  onConfirm,
  onCancel,
  ...props
}: Omit<DialogProps, 'onClose'> & {
  groupToRemove: Option<GroupWithId>
  onConfirm: () => void
  onCancel: () => void
}) => {
  const { t } = useTranslation()

  return (
    <Dialog onClose={onCancel} aria-describedby="group-content" aria-labelledby="group-title" {...props}>
      <DialogTitle className="grow" id="group-title">
        {t('dialog.group.removing.title')}
      </DialogTitle>
      <DialogContent dividers id="group-content">
        <DialogContentText className="py-12">
          {t('dialog.group.removing.content', groupToRemove.map((g) => ({ name: g.name })).unwrapOr({}))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={onConfirm} color="inherit" autoFocus>
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemovingGroupDialog
