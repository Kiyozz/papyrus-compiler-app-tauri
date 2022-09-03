/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { open } from '@tauri-apps/api/shell'
import { documentationUrl } from 'App/Constant/Documentation'
import { useProduction } from 'App/Hook/UseProduction'
import { useTelemetry } from 'App/Hook/UseTelemetry'

export function useDocumentation() {
  const isProduction = useProduction()
  const { send } = useTelemetry()
  const url = isProduction ? documentationUrl.production : documentationUrl.development

  const openTheDocumentation = (reason: 'enter' | 'click' | 'settings-app-bar') => {
    send('TelemetryEvent.documentationOpenFromNav', { reason })
    void open(url)
  }

  return {
    open: openTheDocumentation,
    url,
  }
}
