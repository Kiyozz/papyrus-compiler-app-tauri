/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import LogItem from 'App/Component/Dialog/CompilationLogs/LogItem'
import Dialog from 'App/Component/UI/Dialog'
import ButtonRoot from 'App/Component/UI/Button'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useDialogs } from 'App/Hook/UseDialogs'
import { enterPageAnimate } from 'App/Lib/Framer'
import { toast } from 'App/Lib/Toaster'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationLogsDialog() {
  const { t } = useTranslation()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const {
    compilationLogs: [isOpen, setOpen],
  } = useDialogs()
  const { logs, clear } = useCompilationLogs()

  const hasNoLogs = is.emptyArray(logs)

  return (
    <>
      <Dialog
        title={t('dialog.logs.title')}
        actions={
          <>
            <ButtonRoot className="mr-4" disabled={hasNoLogs} onClick={clear} variant="secondary">
              {t('common.clearList')}
            </ButtonRoot>
            <div className="ml-auto">
              <ButtonRoot
                ref={closeButtonRef}
                color="inherit"
                onClick={() => {
                  setOpen(false)
                }}
              >
                {t('common.close')}
              </ButtonRoot>
            </div>
          </>
        }
        open={isOpen}
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
                      toast.error(t('common.copyError', { error: res.val }))
                    } else {
                      toast.success(t('common.copySuccess'))
                    }
                  }}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  )
}

export default CompilationLogsDialog
