/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { FileScriptCompilation } from 'App/Type/FileScriptCompilation'

export const isRunning = (fileScriptCompilation: FileScriptCompilation): boolean =>
  fileScriptCompilation.status === 'running'

const classNameFromStatus = (script: FileScriptCompilation): string => {
  switch (script.status) {
    case 'idle':
      return 'text-black-600 dark:text-gray-500'
    case 'running':
      return 'text-blue-800 dark:text-blue-600'
    case 'done':
      return 'text-green-500 dark:text-green-400'
    default:
      return 'text-red-300'
  }
}

export const IconFromStatus = ({ script }: { script: FileScriptCompilation }) => {
  switch (script.status) {
    case 'idle':
      return null
    case 'running':
      return <HourglassEmptyIcon className={classNameFromStatus(script)} />
    case 'done':
      return <CheckCircleIcon className={classNameFromStatus(script)} />
    default:
      return <ErrorIcon className={classNameFromStatus(script)} />
  }
}
