/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import AppDrawer from 'App/Components/AppDrawer'
import { useSyncHtmlTheme } from 'App/Hooks/UseSyncHtmlTheme'
import { Outlet } from 'react-router-dom'

function App() {
  useSyncHtmlTheme()

  return (
    <>
      <AppDrawer />

      <Outlet />
    </>
  )
}

export default App
