/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import CompilationLogsDialog from 'App/Component/Dialog/CompilationLogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import TelemetryDialog from 'App/Component/Dialog/TelemetryDialog'
import Drawer from 'App/Component/Drawer'
import LatestVersionManager from 'App/Component/Snackbar/LatestVersionManager'
import SettingsTutorial from 'App/Component/SettingsTutorial'
import * as Button from 'App/Component/UI/Button'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useResetConf } from 'App/Hook/Conf/UseResetConf'
import { useListenConfReset } from 'App/Hook/UseListenConfReset'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useRootTheme } from 'App/Hook/UseRootTheme'
import SettingsTutorialProvider from 'App/Hook/Tutorial/UseSettingsTutorial'
import { fadeAnimate } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

function App() {
  useRootTheme()
  const { t } = useTranslation()
  const conf = useConf()
  const { trackEvent } = useMatomo()
  const resetConf = useResetConf()

  useListenConfReset()

  const memoizedToaster = useMemo(() => {
    return createPortal(<Toaster position="bottom-left" />, document.body)
  }, [])

  return (
    <>
      {memoizedToaster}
      <AnimatePresence>
        {conf.isLoading ? (
          <motion.div {...fadeAnimate} transition={{ delay: 0.3 }}>
            Loading configuration...
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
        ) : (
          <motion.div
            {...fadeAnimate}
            className="container prose mx-auto flex h-screen w-full max-w-full flex-col justify-center p-12 dark:prose-invert"
          >
            <ExclamationTriangleIcon className="mb-4 h-24 w-24 shrink-0 text-yellow-500" aria-hidden="true" />
            <div>
              <h1>{t('common.appConfLoadError.title')}</h1>
              <p>{t('common.appConfLoadError.content')}</p>
              <Button.Root
                onClick={async () => {
                  trackEvent({
                    category: 'Conf',
                    action: 'Reset',
                    name: 'Invalid Conf',
                  })
                  await resetConf.mutateAsync()
                }}
                disabled={resetConf.isLoading}
                tabIndex={0}
              >
                <Button.Icon edge="start" className={twMerge(resetConf.isLoading && 'animate-spin')}>
                  <ArrowPathIcon />
                </Button.Icon>
                {t('common.reset')}
              </Button.Root>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
