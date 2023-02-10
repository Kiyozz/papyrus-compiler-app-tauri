/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Fade from '@mui/material/Fade'
import CompilationLogsDialog from 'App/Component/Dialog/CompilationLogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import TelemetryDialog from 'App/Component/Dialog/TelemetryDialog'
import AppDrawer from 'App/Component/Drawer/AppDrawer'
import LatestVersionSnackbar from 'App/Component/Snackbar/LatestVersionSnackbar'
import SettingsTutorial from 'App/Component/SettingsTutorial'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useRootTheme } from 'App/Hook/UseRootTheme'
import SettingsTutorialProvider from 'App/Hook/Tutorial/UseSettingsTutorial'
import { Outlet } from 'react-router-dom'

function App() {
  useRootTheme()
  const { isLoading } = useConf()

  return (
    <>
      <Fade in={isLoading} timeout={{ enter: 3000, exit: 0 }} unmountOnExit>
        <div>Loading configuration...</div>
      </Fade>
      <Fade in={!isLoading}>
        <div>
          <SettingsTutorialProvider>
            <AppDrawer />
            <CompilationLogsDialog />
            <OpenDocumentationDialog />
            <LatestVersionSnackbar />
            <SettingsTutorial />
            <TelemetryDialog />

            <Outlet />
          </SettingsTutorialProvider>
        </div>
      </Fade>
    </>
  )
}

export default App
