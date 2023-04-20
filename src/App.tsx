/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CompilationLogsDialog from 'App/Component/Dialog/CompilationLogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import TelemetryDialog from 'App/Component/Dialog/TelemetryDialog'
import Drawer from 'App/Component/Drawer'
import LatestVersionSnackbar from 'App/Component/Snackbar/LatestVersionSnackbar'
import SettingsTutorial from 'App/Component/SettingsTutorial'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useListenConfReset } from 'App/Hook/UseListenConfReset'
import { useRootTheme } from 'App/Hook/UseRootTheme'
import SettingsTutorialProvider from 'App/Hook/Tutorial/UseSettingsTutorial'
import { fadeAnimate } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

function App() {
  useRootTheme()
  const { isLoading } = useConf()

  useListenConfReset()

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div {...fadeAnimate} transition={{ delay: 0.3 }}>
            Loading configuration...
          </motion.div>
        ) : (
          <motion.div layoutScroll {...fadeAnimate}>
            <SettingsTutorialProvider>
              {/* <AppDrawer /> */}
              <Drawer />
              <CompilationLogsDialog />
              <OpenDocumentationDialog />
              <LatestVersionSnackbar />
              <SettingsTutorial />
              <TelemetryDialog />

              <Outlet />
            </SettingsTutorialProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
