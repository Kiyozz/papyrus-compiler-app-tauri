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
import { E, TE } from 'App/Lib/FpTs'

const logs = createLogs('useDocumentation')

const openUrl = (url: string) => () => open(url)

export function useDocumentation() {
  const { trackEvent } = useMatomo()
  const documentationUrl = useDocumentationUrl()

  const openTheDocumentation = async (
    _reason: 'enter' | 'click' | 'settings-app-bar',
  ): Promise<E.Either<Error, void>> => {
    if (!documentationUrl.data) {
      void logs.error('cannot open documentation, environment is not set')()

      return E.left(new Error('Cannot open documentation, environment is not set'))
    }

    trackEvent({
      category: 'Documentation',
      action: 'Open',
      name: 'Nav',
    })

    void logs.debug('open documentation')()

    const res = await TE.tryCatch(
      openUrl(documentationUrl.data),
      (errReason) => new Error(`Failed to open documentation, error given: ${errReason}`),
    )()

    if (E.isLeft(res)) {
      void logs.error('error open documentation')()

      console.error(res.left)
    }

    return res
  }

  return {
    open: openTheDocumentation,
  }
}
