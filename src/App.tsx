/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CompilationLogsDialog from 'App/Component/Dialog/CompilationLogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import AppDrawer from 'App/Component/Drawer/AppDrawer'
import LatestVersionSnackbar from 'App/Component/Snackbar/LatestVersionSnackbar'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useRootTheme } from 'App/Hook/UseRootTheme'
import { Outlet } from 'react-router-dom'

function App() {
  useRootTheme()
  const { isLoading } = useConf()

  return (
    <>
      {isLoading ? (
        <div>Loading configuration...</div>
      ) : (
        <>
          <AppDrawer />
          <CompilationLogsDialog />
          <OpenDocumentationDialog />
          <LatestVersionSnackbar />

          <Outlet />
        </>
      )}
    </>
  )
}

export default App
