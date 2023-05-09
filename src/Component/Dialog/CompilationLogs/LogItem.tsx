/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ClipboardIcon } from '@heroicons/react/24/outline'
import { writeText as copyToClipboard } from '@tauri-apps/api/clipboard'
import Badge from 'App/Component/UI/Badge'
import * as Button from 'App/Component/UI/Button'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { type CompilationLog } from 'App/Lib/Compilation/CompilationLog'
import { useTranslation } from 'react-i18next'
import { Result } from 'ts-results'

function LogItem({
  log,
  onClickCopy,
  hidden,
}: {
  log: CompilationLog
  onClickCopy: (res: Result<void, Error>) => void
  hidden: boolean
}) {
  const { t } = useTranslation()
  const { remove } = useCompilationLogs()
  const isSuccessful = log.status === 'success'
  const isError = log.status === 'error'

  return (
    <li
      aria-describedby={`${log.script.id}-logs`}
      aria-labelledby={`${log.script.id}-title`}
      className="py-4"
      hidden={hidden}
    >
      <div className="sticky -top-1 rounded-b-none bg-white px-6 pb-2">
        <div id={`${log.script.id}-title`} aria-label={log.script.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-hidden">
            <span>{log.script.name}</span>
            {isSuccessful && <Badge variant="success">{t('common.succeeded')}</Badge>}
            {isError && <Badge variant="error">{t('common.failed')}</Badge>}
          </div>
          <div className="flex gap-4">
            <Button.Root
              variant="soft"
              color="error"
              onClick={() => {
                remove(log.script)
              }}
            >
              {t('common.remove')}
            </Button.Root>
            <Button.Root
              onClick={async () => {
                const res = await Result.wrapAsync(async () => {
                  await copyToClipboard(`${log.script.name}\n\n${log.output.trim()}`)
                })

                onClickCopy(res.mapErr((reason) => new Error('Failed to copy to clipboard', { cause: reason })))
              }}
            >
              <Button.Icon edge="start">
                <ClipboardIcon />
              </Button.Icon>
              {t('common.copy')}
            </Button.Root>
          </div>
        </div>
      </div>
      <code className="block w-full bg-gray-800 p-4 text-white dark:bg-black" id={`${log.script.id}-logs`} role="log">
        {log.output.split('\n').map((outputLine, i) => (
          <span className="block select-text break-words text-justify font-mono text-xs" key={i}>
            {outputLine}
          </span>
        ))}
      </code>
    </li>
  )
}

export default LogItem
