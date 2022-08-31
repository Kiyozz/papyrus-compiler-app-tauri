/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import AppProvider from 'App/Hook/UseApp'
import CompilationPage from 'App/Page/CompilationPage'
import GroupsPage from 'App/Page/GroupsPage'
import SettingsPage from 'App/Page/SettingsPage'
import { configureTranslations } from 'App/Translations/ConfigureTranslations'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import MuiTheme from './MuiTheme'
import './style.css'

await configureTranslations()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <MuiTheme>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<CompilationPage />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </MuiTheme>
    </AppProvider>
  </React.StrictMode>,
)
