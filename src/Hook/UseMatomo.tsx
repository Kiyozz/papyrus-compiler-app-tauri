/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMatomo as useTrackerMatomo } from '@datapunt/matomo-tracker-react'
import { useConf } from 'App/Hook/Conf/UseConf'

export const useMatomo = () => {
  const conf = useConf()
  const { trackPageView, trackEvent, trackEvents, trackLink } = useTrackerMatomo()

  const track = (action: () => void) => {
    if (conf.isSuccess && conf.data.telemetry.use) {
      action()
    }
  }

  return {
    trackPageView: (params: Parameters<typeof trackPageView>[0]) => {
      track(() => {
        trackPageView(params)
      })
    },
    trackEvent: (params: Parameters<typeof trackEvent>[0]) => {
      track(() => {
        trackEvent(params)
      })
    },
    trackEvents: () => {
      track(() => {
        trackEvents()
      })
    },
    trackLink: (params: Parameters<typeof trackLink>[0]) => {
      track(() => {
        trackLink(params)
      })
    },
  }
}
