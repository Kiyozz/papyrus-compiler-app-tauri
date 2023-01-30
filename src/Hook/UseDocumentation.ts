/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open } from '@tauri-apps/api/shell'
import { documentationUrl } from 'App/Constant/Documentation'
import { useCurrentEnvironment } from 'App/Hook/UseCurrentEnvironment'
import { useTelemetry } from 'App/Hook/UseTelemetry'
import { isProduction } from 'App/Lib/Environment/IsProduction'
import { E, isNone, TE, O, pipe } from 'App/Lib/FpTs'

const openUrl = (url: string) => () => open(url)

export function useDocumentation() {
  const currentEnvironment = useCurrentEnvironment({ from: 'useDocumentation' })
  const { send } = useTelemetry()
  const url = pipe(
    O.fromNullable(currentEnvironment.data),
    O.map((env) => (isProduction(env) ? documentationUrl.production : documentationUrl.development)),
  )

  const openTheDocumentation = async (
    reason: 'enter' | 'click' | 'settings-app-bar',
  ): Promise<E.Either<Error, void>> => {
    if (isNone(url)) {
      return E.left(new Error('Cannot open documentation, environment is not set'))
    }

    send('TelemetryEvent.documentationOpenFromNav', { reason })
    const res = await TE.tryCatch(
      openUrl(url.value),
      (errReason) => new Error(`Failed to open documentation, given error: ${errReason}`),
    )()

    if (E.isLeft(res)) {
      console.error(res.left)
    }

    return res
  }

  return {
    open: openTheDocumentation,
    url,
  }
}
