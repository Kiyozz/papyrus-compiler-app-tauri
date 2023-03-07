/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'

export interface CompilationLog {
  status: 'success' | 'error'
  output: string
  script: FileScriptCompilation
}
