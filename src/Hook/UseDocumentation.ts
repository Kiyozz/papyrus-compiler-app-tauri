/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open } from '@tauri-apps/api/shell'
import { Console } from 'App/Lib/Console'
import { documentationUrl } from 'App/Constant/Documentation'
import { useProduction } from 'App/Hook/UseProduction'
import { useTelemetry } from 'App/Hook/UseTelemetry'
import { E, TE } from 'App/Lib/FpTs'

const openUrl = (url: string) => () => open(url)

export function useDocumentation() {
  const isProduction = useProduction()
  const { send } = useTelemetry()
  const url = isProduction ? documentationUrl.production : documentationUrl.development

  const openTheDocumentation = async (reason: 'enter' | 'click' | 'settings-app-bar') => {
    send('TelemetryEvent.documentationOpenFromNav', { reason })
    const res = await TE.tryCatch(
      openUrl(url),
      (errReason) => new Error(`Failed to open documentation, given error: ${errReason}`),
    )()

    if (E.isLeft(res)) {
      Console.error(res.left)
    }
  }

  return {
    open: openTheDocumentation,
    url,
  }
}
