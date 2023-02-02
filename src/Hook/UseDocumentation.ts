/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open } from '@tauri-apps/api/shell'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useTelemetry } from 'App/Hook/UseTelemetry'
import { E, TE } from 'App/Lib/FpTs'

const openUrl = (url: string) => () => open(url)

export function useDocumentation() {
  const { send } = useTelemetry()
  const documentationUrl = useDocumentationUrl()

  const openTheDocumentation = async (
    reason: 'enter' | 'click' | 'settings-app-bar',
  ): Promise<E.Either<Error, void>> => {
    if (!documentationUrl.data) {
      return E.left(new Error('Cannot open documentation, environment is not set'))
    }

    send('TelemetryEvent.documentationOpenFromNav', { reason })
    const res = await TE.tryCatch(
      openUrl(documentationUrl.data),
      (errReason) => new Error(`Failed to open documentation, given error: ${errReason}`),
    )()

    if (E.isLeft(res)) {
      console.error(res.left)
    }

    return res
  }

  return {
    open: openTheDocumentation,
  }
}
