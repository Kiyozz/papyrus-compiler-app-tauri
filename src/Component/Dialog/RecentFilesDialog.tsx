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
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import { useRecentFiles } from 'App/Hook/UseRecentFiles'
import cx from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'

function RecentFilesDialog(
  props: Omit<DialogProps, 'onClose' | 'onKeyDown'> & { onClose: () => void; onSubmit: () => void },
) {
  const { t } = useTranslation()
  const {
    moreDetails: [isMoreDetails, setMoreDetails],
    recentFiles,
  } = useRecentFiles()

  const onClickLoad = () => {
    // load files in compilation page
  }

  const handleDialogKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      props.onSubmit()
    }
  }

  return (
    <Dialog
      aria-describedby="recent-files-content"
      aria-labelledby="recent-files-title"
      fullScreen
      onKeyDown={handleDialogKeyDown}
      {...props}
    >
      <Toolbar className="p-0">
        <DialogTitle className="grow" id="recent-files-title">
          {t('dialog.recentFiles.title')}
        </DialogTitle>
        <FormGroup id="recent-files-content">
          <FormControlLabel
            control={<Checkbox checked={isMoreDetails} onChange={() => setMoreDetails((v) => !v)} />}
            label={t('dialog.recentFiles.actions.moreDetails')}
          />
        </FormGroup>
      </Toolbar>
      <DialogContent className={cx(recentFiles.length !== 0 && 'p-0')} dividers>
        {recentFiles.length === 0 ? (
          <DialogContentText>{t('dialog.recentFiles.noRecentFiles')}</DialogContentText>
        ) : (
          <List className="overflow-x-hidden">
            {/*recentFiles.map(script => {
              return (
                <Item
                  disabled={isAlreadyLoaded(script)}
                  key={script.path}
                  onClickDelete={onClickDeleteFile(script)}
                  onClickFile={onClickItem(script)}
                  script={script}
                  selected={selectedRecentFiles.has(script.path)}
                />
              )
            })*/}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} tabIndex={4} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button
          // disabled={selectedRecentFiles.size === 0}
          onClick={onClickLoad}
          tabIndex={3}
          color="inherit"
        >
          {t('dialog.recentFiles.actions.load')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RecentFilesDialog
