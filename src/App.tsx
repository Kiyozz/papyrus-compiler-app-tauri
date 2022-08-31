/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import LogsDialog from 'App/Component/Dialog/LogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import AppDrawer from 'App/Component/Drawer/AppDrawer'
import { useSyncHtmlTheme } from 'App/Hook/UseSyncHtmlTheme'
import { Outlet } from 'react-router-dom'

function App() {
  useSyncHtmlTheme()

  return (
    <>
      <AppDrawer />
      <LogsDialog />
      <OpenDocumentationDialog />

      <Outlet />
    </>
  )
}

export default App
