/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Snackbar from '@mui/material/Snackbar'
import is from '@sindresorhus/is'
import LogItem from 'App/Component/Dialog/CompilationLogs/LogItem'
import Dialog from 'App/Component/UI/Dialog'
import Button from 'App/Component/UI/Button'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useSnackbar } from 'App/Hook/UseSnackbar'
import { enterPageAnimate } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { type KeyboardEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationLogsDialog() {
  const { t } = useTranslation()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
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
        title={t('dialog.logs.title')}
        actions={
          <>
            <Button className="mr-4" disabled={hasNoLogs} onClick={clear} variant="secondary">
              {t('common.clearList')}
            </Button>
            <div className="ml-auto">
              <Button
                ref={closeButtonRef}
                color="inherit"
                onClick={() => {
                  setOpen(false)
                }}
              >
                {t('common.close')}
              </Button>
            </div>
          </>
        }
        open={isOpen}
        onKeyDown={handleDialogKeyDown}
        onClose={setOpen}
        initialFocus={closeButtonRef}
      >
        <AnimatePresence mode="wait" initial={false}>
          {hasNoLogs ? (
            <motion.div key="no-logs" className="flex grow items-center justify-center" {...enterPageAnimate}>
              <h5 className="text-xl leading-6 text-gray-900" key="no-logs">
                {t('dialog.logs.noLogs')}
              </h5>
            </motion.div>
          ) : (
            <motion.ul key="logs-list" role="list" className="divide-y divide-gray-200" {...enterPageAnimate}>
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
            </motion.ul>
          )}
        </AnimatePresence>
      </Dialog>
      {/* <Snackbar
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
      </Snackbar> */}
    </>
  )
}

export default CompilationLogsDialog
