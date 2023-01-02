/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import LogsDialog from 'App/Component/Dialog/LogsDialog'
import OpenDocumentationDialog from 'App/Component/Dialog/OpenDocumentationDialog'
import AppDrawer from 'App/Component/Drawer/AppDrawer'
import { useRootTheme } from 'App/Hook/UseRootTheme'
import { Outlet } from 'react-router-dom'

function App() {
  useRootTheme()

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
