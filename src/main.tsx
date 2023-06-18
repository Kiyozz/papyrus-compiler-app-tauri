/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react'
import { type MatomoInstance } from '@datapunt/matomo-tracker-react/es/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CompilationLogsProvider from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useConf } from 'App/Hook/Conf/UseConf'
import CompilationScriptsProvider from 'App/Hook/UseCompilationScripts'
import DialogsProvider from 'App/Hook/UseDialogs'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useVersion } from 'App/Hook/UseVersion'
import CompilationPage from 'App/Page/CompilationPage'
import GroupsPage from 'App/Page/GroupsPage'
import SettingsPage from 'App/Page/SettingsPage'
import { configureTranslations } from 'App/Translation/ConfigureTranslations'
import React, { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'usehooks-ts'
import App from './App'
import './style.css'

declare global {
  interface Error {
    toJSON: () => { type: string; message: string }
  }
}

// Serialize the error to JSON for IPC
// eslint-disable-next-line no-extend-native
Error.prototype.toJSON = function () {
  return {
    type: this.name,
    message: this.message,
  }
}

await configureTranslations()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
    },
  },
})

const Matomo = ({ children }: PropsWithChildren) => {
  const initialized = useRef(false)
  const { pathname } = useLocation()
  const version = useVersion()

  const conf = useConf({
    enabled: version.isSuccess,
  })

  useEffect(() => {
    if (conf.isSuccess) {
      const instance = createInstance({
        urlBase: 'http://localhost:4000',
        siteId: 1,
        disabled: !conf.data.telemetry.use,
        heartBeat: {
          active: conf.data.telemetry.use,
        },
      })

      setMatomo(instance)

      const isInTutorial = conf.data.tutorial.telemetry || conf.data.tutorial.settings

      if (!initialized.current && conf.data.telemetry.use && !isInTutorial) {
        instance.trackPageView({
          href: pathname,
        })
        instance.trackEvent({
          category: 'App',
          action: 'Start',
          name: version.data,
        })

        initialized.current = true
      }
    }
  }, [
    conf.isSuccess,
    conf.data?.telemetry.use,
    conf.data?.tutorial.telemetry,
    conf.data?.tutorial.settings,
    pathname,
    version.data,
  ])

  const [matomo, setMatomo] = useState<MatomoInstance>()

  if (matomo == null) return null

  // @ts-expect-error - d.ts is invalid
  return <MatomoProvider value={matomo}>{children}</MatomoProvider>
}

const RouterListen = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const { trackPageView } = useMatomo()

  useUpdateEffect(() => {
    trackPageView({ href: location.pathname })
  }, [location.pathname])

  return <>{children}</>
}

const root = document.getElementById('root') as HTMLElement
const rootRef = ReactDOM.createRoot(root)

rootRef.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position="bottom-right" />
      <DialogsProvider>
        <CompilationLogsProvider>
          <CompilationScriptsProvider>
            <MemoryRouter>
              <Matomo>
                <RouterListen>
                  <Routes>
                    <Route path="/" element={<App />}>
                      <Route index element={<CompilationPage />} />
                      <Route path="/groups" element={<GroupsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                  </Routes>
                </RouterListen>
              </Matomo>
            </MemoryRouter>
          </CompilationScriptsProvider>
        </CompilationLogsProvider>
      </DialogsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
