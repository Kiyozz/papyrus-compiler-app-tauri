/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Fade from '@mui/material/Fade'
import CompilationLogsDialog from 'App/Component/Dialog/CompilationLogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import AppDrawer from 'App/Component/Drawer/AppDrawer'
import LatestVersionSnackbar from 'App/Component/Snackbar/LatestVersionSnackbar'
import Tutorial from 'App/Component/Tutorial'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useRootTheme } from 'App/Hook/UseRootTheme'
import TutorialProvider from 'App/Hook/UseTutorial'
import { Outlet } from 'react-router-dom'

function App() {
  useRootTheme()
  const { data: conf, isLoading, isSuccess } = useConf()

  return (
    <>
      <Fade in={isLoading} timeout={{ enter: 3000, exit: 0 }} unmountOnExit>
        <div>Loading configuration...</div>
      </Fade>
      <Fade in={!isLoading}>
        <div>
          {isSuccess && conf && (
            <TutorialProvider conf={conf}>
              <AppDrawer />
              <CompilationLogsDialog />
              <OpenDocumentationDialog />
              <LatestVersionSnackbar />
              <Tutorial />

              <Outlet />
            </TutorialProvider>
          )}
        </div>
      </Fade>
    </>
  )
}

export default App
