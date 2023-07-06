/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { appLocalDataDir } from '@tauri-apps/api/path'
import CompilationLogsDialog from 'App/Component/Dialog/CompilationLogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import TelemetryDialog from 'App/Component/Dialog/TelemetryDialog'
import Drawer from 'App/Component/Drawer'
import LatestVersionManager from 'App/Component/Snackbar/LatestVersionManager'
import SettingsTutorial from 'App/Component/SettingsTutorial'
import * as Button from 'App/Component/UI/Button'
import ZodErrorFormat from 'App/Component/ZodErrorFormat'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useResetConf } from 'App/Hook/Conf/UseResetConf'
import { useListenConfReset } from 'App/Hook/UseListenConfReset'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useSyncRootTheme } from 'App/Hook/UseSyncRootTheme'
import SettingsTutorialProvider from 'App/Hook/Tutorial/UseSettingsTutorial'
import { confFileName } from 'App/Lib/Conf/Conf'
import { openFile } from 'App/Lib/File/Open'
import { fadeAnimate } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { type ZodError } from 'zod'

function App() {
  useSyncRootTheme()
  useListenConfReset()

  const { trackEvent } = useMatomo()
  const { t } = useTranslation()
  const resetConf = useResetConf()
  const conf = useConf()

  const memoizedToaster = useMemo(() => {
    return createPortal(<Toaster position="bottom-left" />, document.body)
  }, [])

  return (
    <>
      {memoizedToaster}
      <AnimatePresence>
        {conf.isLoading ? (
          <motion.div
            key="conf-loading"
            className="fixed left-4 top-4 -z-10"
            {...fadeAnimate}
            transition={{ delay: 0.3 }}
          >
            {t('common.loadingConf')}
          </motion.div>
        ) : conf.isSuccess ? (
          <motion.div layoutScroll {...fadeAnimate}>
            <SettingsTutorialProvider>
              <Drawer />
              <CompilationLogsDialog />
              <OpenDocumentationDialog />
              <LatestVersionManager />
              <SettingsTutorial />
              <TelemetryDialog />

              <Outlet />
            </SettingsTutorialProvider>
          </motion.div>
        ) : conf.isError ? (
          <motion.div
            {...fadeAnimate}
            className="container prose mx-auto flex h-screen max-w-6xl flex-col justify-center p-12 dark:prose-invert"
          >
            <ExclamationTriangleIcon className="mb-4 h-24 w-24 shrink-0 text-yellow-500" aria-hidden="true" />
            <div>
              <h1>{t('common.appConfLoadError.title')}</h1>
              <p>{t('common.appConfLoadError.content')}</p>
              <div className="flex gap-4">
                <Button.Root
                  onClick={async () => {
                    trackEvent({
                      category: 'Conf',
                      action: 'Reset',
                      name: 'Invalid Conf',
                    })
                    resetConf.mutate()
                  }}
                  disabled={resetConf.isLoading}
                  tabIndex={0}
                  color={resetConf.isError ? 'error' : 'default'}
                >
                  <Button.Icon edge="start" className={twMerge(resetConf.isLoading && 'animate-spin')}>
                    {resetConf.isError ? <ExclamationCircleIcon /> : <ArrowPathIcon />}
                  </Button.Icon>
                  {resetConf.isError ? t('common.appConfLoadError.resetError') : t('common.reset')}
                </Button.Root>
                <Button.Root
                  onClick={async () => {
                    const confFile = `${await appLocalDataDir()}${confFileName}`
                    const res = await openFile(confFile)

                    if (res.err) {
                      console.error(res.val)
                    }
                  }}
                >
                  <Button.Icon edge="start">
                    <Cog6ToothIcon />
                  </Button.Icon>
                  {t('common.appConfLoadError.openConfFile')}
                </Button.Root>
                <Button.Root
                  onClick={async () => {
                    const logFile = `${await appLocalDataDir()}pca.log`

                    const res = await openFile(logFile)

                    if (res.err) {
                      console.error(res.val)
                    }
                  }}
                >
                  <Button.Icon edge="start">
                    <DocumentTextIcon />
                  </Button.Icon>
                  {t('common.appConfLoadError.openLogFile')}
                </Button.Root>
              </div>
              {conf.isError && <ZodErrorFormat error={conf.error as ZodError} />}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default App
