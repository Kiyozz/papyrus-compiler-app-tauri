/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { type FileScript } from 'App/Lib/Conf/ConfZod'

export const isRunning = (fileScriptCompilation: FileScriptCompilation): boolean =>
  fileScriptCompilation.status === 'running'

export const isBusy = (fileScriptCompilation: FileScriptCompilation): boolean => fileScriptCompilation.status === 'busy'

export const isDone = (fileScriptCompilation: FileScriptCompilation): boolean => fileScriptCompilation.status === 'done'

export const isFileScriptCompilation = (script: FileScript): script is FileScriptCompilation => 'status' in script
