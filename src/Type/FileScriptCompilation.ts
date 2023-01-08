/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScript } from 'App/Type/FileScript'

export type FileScriptCompilation = {
  status: 'idle' | 'running' | 'done' | 'error'
} & FileScript
