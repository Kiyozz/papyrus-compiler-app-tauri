/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import TimerIcon from '@mui/icons-material/Timer'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { match } from 'ts-pattern'

export const CompilationIcon = ({ script }: { script: FileScriptCompilation }) => {
  return match(script.status)
    .with('idle', () => null)
    .with('running', () => <HourglassEmptyIcon className="text-blue-800 dark:text-blue-600" />)
    .with('busy', () => <TimerIcon className="text-gray-300 dark:text-gray-600" />)
    .with('done', () => <CheckCircleIcon className="text-green-500 dark:text-green-400" />)
    .with('error', () => <ErrorIcon className="text-red-300" />)
    .exhaustive()
}
