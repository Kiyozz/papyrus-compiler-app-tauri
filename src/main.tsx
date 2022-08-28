/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import AppProvider from 'App/Hooks/UseApp'
import Compilation from 'App/Pages/Compilation/Page'
import Groups from 'App/Pages/Groups/Page'
import Logs from 'App/Pages/Logs/Page'
import Settings from 'App/Pages/Settings/Page'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import MuiTheme from './MuiTheme'
import './style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <MuiTheme>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Compilation />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logs" element={<Logs />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </MuiTheme>
    </AppProvider>
  </React.StrictMode>,
)
