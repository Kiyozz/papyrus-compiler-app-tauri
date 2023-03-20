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
import is from '@sindresorhus/is'
import LogItem from 'App/Component/Dialog/CompilationLogs/LogItem'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useSnackbar } from 'App/Hook/UseSnackbar'
import { enterPageAnimate } from 'App/Lib/Framer'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
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

  const hasNoLogs = is.emptyArray(logs)

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
        <DialogContent className={cx('flex flex-col gap-4')} dividers id="logs-content">
          <AnimatePresence mode="wait">
            {hasNoLogs ? (
              <motion.div key="no-logs" className="flex grow items-center justify-center" {...enterPageAnimate}>
                <Typography key="no-logs" variant="h5">
                  {t('dialog.logs.noLogs')}
                </Typography>
              </motion.div>
            ) : (
              <motion.div key="logs-list" className="flex flex-col gap-4" {...enterPageAnimate}>
                {logs.map((log) => (
                  <LogItem
                    key={log.script.id}
                    log={log}
                    onClickCopy={(res) => {
                      if (res.err) {
                        console.error(res.val)
                        errorCopy(res.val)
                      } else {
                        successCopy()
                      }
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
