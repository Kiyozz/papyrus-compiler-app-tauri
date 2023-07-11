/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useTranslation } from 'react-i18next'
import { type ZodError } from 'zod'
import * as Button from 'App/Component/UI/Button'

function ZodErrorFormat({ error }: { error: ZodError }) {
  const { t } = useTranslation()

  console.log({ error })

  return (
    <pre className="prose max-w-full dark:prose-invert">
      {error.errors.map((err) => (
        <div key={`${err.path.join(',')}:${err.code}`} className="relative flex">
          <Button.Root
            variant="ghost"
            color="inherit"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
            tabIndex={0}
          >
            {t('common.copy')}
          </Button.Root>
          <div className="flex w-full cursor-text select-text flex-col pr-20">
            <code>{err.path.map((p) => `"${p}"`).join(' → ')}</code>
            <code className="ml-12">
              {err.code}: &quot;{err.message}&quot;
            </code>
          </div>
        </div>
      ))}
    </pre>
  )
}

export default ZodErrorFormat
