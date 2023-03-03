/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog, { type DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LogItem from 'App/Component/Dialog/CompilationLogs/LogItem'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useSnackbar } from 'App/Hook/UseSnackbar'
import { A, isLeft, pipe } from 'App/Lib/FpTs'
import cx from 'classnames'
import { type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'

const CompilationLogsDialog = (props: Omit<DialogProps, 'open' | 'onClose' | 'onKeyDown'>) => {
  const { t } = useTranslation()
  const {
    compilationLogs: [isOpen, setOpen],
  } = useDialogs()
  const { logs, clear } = useCompilationLogs()
  const {
    snackbar,
    error: errorCopy,
    empty: emptyCopy,
    success: successCopy,
    close: closeCopy,
  } = useSnackbar({
    errorMessage: (error) => t('common.copyError', { error }),
    successMessage: () => t('common.copySuccess'),
  })

  const hasNoLogs = A.isEmpty(logs)

  const handleDialogKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      setOpen(false)
    }
  }

  return (
    <>
      <Dialog
        aria-describedby="logs-content"
        aria-labelledby="logs-title"
        fullScreen
        open={isOpen}
        onKeyDown={handleDialogKeyDown}
        onClose={() => {
          setOpen(false)
        }}
        {...props}
      >
        <Toolbar className="p-0">
          <DialogTitle className="grow" id="logs-title">
            {t('dialog.logs.title')}
          </DialogTitle>
          <Button className="mr-4" disabled={hasNoLogs} onClick={clear} color="inherit">
            {t('common.clear')}
          </Button>
        </Toolbar>
        <DialogContent
          className={cx('flex flex-col gap-4', hasNoLogs && 'items-center justify-center')}
          dividers
          id="logs-content"
        >
          {pipe(
            logs,
            A.matchW(
              () => (
                <Typography component="span" variant="h5">
                  {t('dialog.logs.noLogs')}
                </Typography>
              ),
              (logs) =>
                logs.map((log) => (
                  <LogItem
                    key={log.script.id}
                    log={log}
                    onClickCopy={(res) => {
                      if (isLeft(res)) {
                        console.error(res.left)
                        errorCopy(res.left)
                      } else {
                        successCopy()
                      }
                    }}
                  />
                )),
            ),
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => {
              setOpen(false)
            }}
          >
            {t('common.close')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeCopy}
        TransitionProps={{
          onExited: () => {
            emptyCopy()
          },
        }}
      >
        <Alert severity={snackbar.status}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  )
}

export default CompilationLogsDialog
