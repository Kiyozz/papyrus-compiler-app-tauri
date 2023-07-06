/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import LogItem from 'App/Component/Dialog/CompilationLogs/LogItem'
import * as Dialog from 'App/Component/UI/Dialog'
import ButtonRoot from 'App/Component/UI/Button'
import Switch from 'App/Component/UI/Switch'
import { useCompilationLogsStore } from 'App/Hook/CompilationLogs/UseCompilationLogsStore'
import { useDialogsStore } from 'App/Hook/UseDialogsStore'
import { enterPageAnimate } from 'App/Lib/Framer'
import { toast } from 'App/Lib/Toaster'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationLogsDialog() {
  const { t } = useTranslation()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { compilationLogs: isOpen, setCompilationLogs: setOpen } = useDialogsStore()
  const { logs, clear } = useCompilationLogsStore()
  const [isDisplayErrorOnly, setDisplayErrorOnly] = useState(false)

  const hasNoLogs = is.emptyArray(logs)

  return (
    <>
      <Dialog.Root open={isOpen} onClose={setOpen} initialFocus={closeButtonRef} fullScreen>
        <Dialog.Title>
          <h2>{t('dialog.logs.title')}</h2>
          <div className="mt-4 flex items-center">
            <Switch
              checked={isDisplayErrorOnly}
              onChange={setDisplayErrorOnly}
              label={t('dialog.logs.displayErrorOnly')}
              name="display-error-only"
            />
          </div>
        </Dialog.Title>
        <Dialog.Content>
          <AnimatePresence mode="wait" initial={false}>
            {hasNoLogs ? (
              <motion.div key="no-logs" className="flex grow items-center justify-center" {...enterPageAnimate}>
                <h5 className="text-xl leading-6 text-gray-900 dark:text-gray-100" key="no-logs">
                  {t('dialog.logs.noLogs')}
                </h5>
              </motion.div>
            ) : (
              <motion.ul
                key="logs-list"
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
                {...enterPageAnimate}
              >
                {logs.map((log) => (
                  <LogItem
                    key={log.script.id}
                    log={log}
                    hidden={log.status === 'success' && isDisplayErrorOnly}
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
        </Dialog.Content>
        <Dialog.Actions>
          <ButtonRoot className="mr-4" disabled={hasNoLogs} onClick={clear} variant="secondary">
            {t('common.clearList')}
          </ButtonRoot>
          <div className="ml-auto">
            <ButtonRoot
              ref={closeButtonRef}
              variant="secondary"
              onClick={() => {
                setOpen(false)
              }}
            >
              {t('common.close')}
            </ButtonRoot>
          </div>
        </Dialog.Actions>
      </Dialog.Root>
    </>
  )
}

export default CompilationLogsDialog
