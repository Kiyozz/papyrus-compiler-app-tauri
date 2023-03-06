/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { writeText as copyToClipboard } from '@tauri-apps/api/clipboard'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { type CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { Result } from 'ts-results'

const LogItem = ({ log, onClickCopy }: { log: CompilationLog; onClickCopy: (res: Result<void, Error>) => void }) => {
  const { t } = useTranslation()
  const { remove } = useCompilationLogs()
  const isSuccessful = log.status === 'success'
  const isError = log.status === 'error'

  return (
    <Paper aria-describedby={`${log.script.id}-logs`} aria-labelledby={`${log.script.id}-title`} elevation={3}>
      <Paper elevation={3} className="sticky -top-3 rounded-b-none p-2 shadow-none">
        <Typography
          component="div"
          id={`${log.script.id}-title`}
          aria-label={log.script.name}
          className="flex items-center justify-between"
        >
          <Typography className={cx('flex items-center gap-2 overflow-x-hidden')} variant="h6">
            {isSuccessful && <CheckCircleIcon className="text-green-500" />}
            {isError && <ErrorIcon className="text-red-300" />} {log.script.name}
          </Typography>
          <div className="flex">
            <Button
              color="inherit"
              onClick={async () => {
                const res = await Result.wrapAsync(async () => {
                  await copyToClipboard(`${log.script.name}\n\n${log.output.trim()}`)
                })

                onClickCopy(res.mapErr((reason) => new Error(`Failed to copy to clipboard: ${reason}`)))
              }}
            >
              {t('common.copy')}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                remove(log.script)
              }}
            >
              {t('common.remove')}
            </Button>
          </div>
        </Typography>
      </Paper>
      <Paper
        className="block w-full rounded-t-none bg-gray-800 p-4 text-white dark:bg-black-800"
        component="code"
        elevation={0}
        id={`${log.script.id}-logs`}
        role="log"
      >
        {log.output.split('\n').map((outputLine, i) => (
          <span className="block select-text break-words text-justify font-mono text-xs" key={i}>
            {outputLine}
          </span>
        ))}
      </Paper>
    </Paper>
  )
}

export default LogItem
