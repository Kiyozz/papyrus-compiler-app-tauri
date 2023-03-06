/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open } from '@tauri-apps/api/shell'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useMatomo } from 'App/Hook/UseMatomo'
import { createLogs } from 'App/Lib/CreateLog'
import { Err, Result } from 'ts-results'

const logs = createLogs('useDocumentation')

const openUrl = async (url: string): Promise<Result<void, Error>> =>
  (
    await Result.wrapAsync(async () => {
      await open(url)
    })
  ).mapErr((reason) => new Error(`Cannot open url, error given: ${reason}`))

export function useDocumentation() {
  const { trackEvent } = useMatomo()
  const documentationUrl = useDocumentationUrl()

  const openTheDocumentation = async (
    _reason: 'enter' | 'click' | 'settings-app-bar',
  ): Promise<Result<void, Error>> => {
    if (documentationUrl.data == null) {
      logs.error('cannot open documentation, environment is not set')()

      return Err(new Error('Cannot open documentation, environment is not set'))
    }

    trackEvent({
      category: 'Documentation',
      action: 'Open',
      name: 'Nav',
    })

    logs.debug('open documentation')()

    const res = await openUrl(documentationUrl.data)

    if (res.err) {
      logs.error('error open documentation')()

      console.error(res.val)
    }

    return res
  }

  return {
    open: openTheDocumentation,
  }
}
