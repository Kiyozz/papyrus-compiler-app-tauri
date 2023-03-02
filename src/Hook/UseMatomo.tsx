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
      try {
        action()
      } catch {
        // ignore if the server is not available
      }
    }
  }

  return {
    trackPageView: (params: Parameters<typeof trackPageView>[0], { force = false }: { force?: boolean } = {}) => {
      if (force) {
        trackPageView(params)
      } else {
        track(() => {
          return trackPageView(params)
        })
      }
    },
    trackEvent: (params: Parameters<typeof trackEvent>[0], { force = false }: { force?: boolean } = {}) => {
      if (force) {
        trackEvent(params)
      } else {
        track(() => {
          return trackEvent(params)
        })
      }
    },
    trackEvents: () => {
      track(() => {
        return trackEvents()
      })
    },
    trackLink: (params: Parameters<typeof trackLink>[0]) => {
      track(() => {
        return trackLink(params)
      })
    },
  }
}
