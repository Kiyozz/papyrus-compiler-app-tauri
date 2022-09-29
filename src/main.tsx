/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { join } from '@tauri-apps/api/path'
import { Conf } from 'App/Service/Conf/Conf'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { GameType } from 'App/Enum/GameType'
import { Theme } from 'App/Enum/Theme'
import AppProvider from 'App/Hook/UseApp'
import ConfProvider from 'App/Hook/UseConf'
import CompilationPage from 'App/Page/CompilationPage'
import GroupsPage from 'App/Page/GroupsPage'
import SettingsPage from 'App/Page/SettingsPage'
import { configureTranslations } from 'App/Translation/ConfigureTranslations'
import { Settings } from 'App/Type/Settings/Settings'
import App from './App'
import MuiTheme from './MuiTheme'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './style.css'

await configureTranslations()

const conf = new Conf<Settings>(
  {
    configName: 'settings',
    defaults: {
      game: {
        type: GameType.se,
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
      theme: Theme.system,
      locale: 'fr',
    },
    schema: {
      game: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            default: GameType.se,
          },
          path: {
            type: 'string',
            default: '',
          },
        },
      },
      compilation: {
        type: 'object',
        properties: {
          compilerPath: {
            type: 'string',
            default: await join('Papyrus Compiler', 'PapyrusCompiler.exe'),
          },
          flag: {
            type: 'string',
            default: 'TESV_Papyrus_Flags.flg',
          },
          concurrentScripts: {
            type: 'number',
            default: 15,
          },
          output: {
            type: 'string',
            default: await join('Data', 'Scripts'),
          },
        },
      },
      tutorial: {
        type: 'object',
        properties: {
          telemetry: {
            type: 'boolean',
            default: true,
          },
          settings: {
            type: 'boolean',
            default: true,
          },
        },
      },
      mo2: {
        type: 'object',
        properties: {
          use: {
            type: 'boolean',
            default: false,
          },
          instance: {
            type: 'string',
            default: undefined,
          },
          output: {
            type: 'string',
            default: await join('overwrite', 'Scripts'),
          },
        },
      },
      groups: {
        type: 'array',
        default: [],
      },
      telemetry: {
        type: 'object',
        properties: {
          use: {
            type: 'boolean',
            default: true,
          },
        },
      },
      theme: {
        type: 'string',
        default: Theme.system,
      },
      locale: {
        type: 'string',
        default: 'fr',
      },
    },
  },
  () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchIntervalInBackground: true,
        },
      },
    })

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ConfProvider conf={conf}>
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
          </ConfProvider>
        </QueryClientProvider>
      </React.StrictMode>,
    )
  },
)
