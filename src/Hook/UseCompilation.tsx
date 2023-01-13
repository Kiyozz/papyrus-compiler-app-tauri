/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'

export function useCompilation() {
  const running = false
  const { add, scripts, remove, clear } = useScriptsList<FileScriptCompilation>({
    initialScripts: [],
  })

  return {
    running,
    scripts,
    add,
    remove,
    clear,
  }
}
