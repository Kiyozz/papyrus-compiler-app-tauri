/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { uniqObjectArrayByKeys } from 'App/Lib/UniqObjectArrayByKeys'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCompilationScriptsStore = create(
  combine(
    {
      scripts: [] as FileScriptCompilation[],
    },
    (set) => ({
      add: (scripts: FileScriptCompilation[]) => {
        set((state) => ({
          scripts: uniqObjectArrayByKeys([...state.scripts, ...scripts])(['name']),
        }))
      },
      replaceAll: (scripts: FileScriptCompilation[]) => {
        set(() => ({
          scripts: uniqObjectArrayByKeys(scripts)(['name']),
        }))
      },
      remove: (scripts: FileScriptCompilation[]) => {
        set((state) => ({
          scripts: state.scripts.filter((fileInState) => !scripts.includes(fileInState)),
        }))
      },
      replace: (script: FileScriptCompilation) => {
        set((state) => ({
          scripts: state.scripts.map((fileInState) => (fileInState.name === script.name ? script : fileInState)),
        }))
      },
      clear: () => {
        set(() => ({
          scripts: [],
        }))
      },
    }),
  ),
)
