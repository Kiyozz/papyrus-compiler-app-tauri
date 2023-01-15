/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'

export type CompilationLog = {
  status: 'success' | 'error'
  output: string
  script: FileScriptCompilation
}
