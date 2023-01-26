/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CompilationLogsProvider from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { pipe } from 'App/Lib/FpTs'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DialogsProvider from 'App/Hook/UseDialogs'
import CompilationPage from 'App/Page/CompilationPage'
import GroupsPage from 'App/Page/GroupsPage'
import SettingsPage from 'App/Page/SettingsPage'
import { configureTranslations } from 'App/Translation/ConfigureTranslations'
import App from './App'
import MuiTheme from './MuiTheme'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './style.css'

await configureTranslations()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
    },
  },
})

pipe(document.getElementById('root') as HTMLElement, ReactDOM.createRoot, (root) =>
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom-right" />
        <DialogsProvider>
          <CompilationLogsProvider>
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
          </CompilationLogsProvider>
        </DialogsProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  ),
)
