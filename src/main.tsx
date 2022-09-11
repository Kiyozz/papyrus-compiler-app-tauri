/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { join } from '@tauri-apps/api/path'
import { GameTypeEnum } from 'App/Enum/GameTypeEnum'
import { ThemeEnum } from 'App/Enum/ThemeEnum'
import AppProvider from 'App/Hook/UseApp'
import SettingsProvider from 'App/Hook/UseSettings'
import CompilationPage from 'App/Page/CompilationPage'
import GroupsPage from 'App/Page/GroupsPage'
import SettingsPage from 'App/Page/SettingsPage'
import { Store } from 'App/Service/Store'
import { configureTranslations } from 'App/Translation/ConfigureTranslations'
import { Settings } from 'App/Type/Settings/Settings'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import MuiTheme from './MuiTheme'
import './style.css'

await configureTranslations()

const store = new Store<Settings>({
  name: 'settings',
  default: {
    game: {
      type: GameTypeEnum.se,
      path: '',
    },
    compilation: {
      compilerPath: await join('Papyrus Compiler', 'PapyrusCompiler.exe'),
      flag: 'TESV_Papyrus_Flags.flg',
      concurrentScripts: 15,
      output: await join('Data', 'Scripts'),
    },
    tutorial: {
      telemetry: true,
      settings: true,
    },
    mo2: {
      use: false,
      instance: undefined,
      output: await join('overwrite', 'Scripts'),
      mods: 'mods',
    },
    groups: [],
    telemetry: {
      use: true,
    },
    theme: ThemeEnum.system,
    locale: 'fr',
  },
})

await store.initialize().catch((err) => {
  console.error('Failed to ensure settings store', err)
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider store={store}>
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
    </SettingsProvider>
  </React.StrictMode>,
)
