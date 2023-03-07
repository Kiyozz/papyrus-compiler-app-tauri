/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useMatomo as useTrackerMatomo } from '@datapunt/matomo-tracker-react'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useCallback } from 'react'

export const useMatomo = () => {
  const conf = useConf()
  const {
    trackPageView: trackPageViewMatomo,
    trackEvent: trackEventMatomo,
    trackEvents: trackEventsMatomo,
    trackLink: trackLinkMatomo,
  } = useTrackerMatomo()

  const track = useCallback(
    (action: () => void) => {
      if (conf.isSuccess && conf.data.telemetry.use) {
        try {
          action()
        } catch {
          // ignore if the server is not available
        }
      }
    },
    [conf.isSuccess, conf.data?.telemetry.use],
  )

  const trackPageView = useCallback(
    (params: Parameters<typeof trackPageViewMatomo>[0], { force = false }: { force?: boolean } = {}) => {
      if (force) {
        trackPageViewMatomo(params)
      } else {
        track(() => {
          return trackPageViewMatomo(params)
        })
      }
    },
    [trackPageViewMatomo, track],
  )

  const trackEvent = useCallback(
    (params: Parameters<typeof trackEventMatomo>[0], { force = false }: { force?: boolean } = {}) => {
      if (force) {
        trackEventMatomo(params)
      } else {
        track(() => {
          return trackEventMatomo(params)
        })
      }
    },
    [trackEventMatomo, track],
  )

  const trackEvents = useCallback(() => {
    track(() => {
      return trackEventsMatomo()
    })
  }, [track, trackEventsMatomo])

  const trackLink = useCallback(
    (params: Parameters<typeof trackLinkMatomo>[0], { force = false }: { force?: boolean } = {}) => {
      if (force) {
        trackLinkMatomo(params)
      } else {
        track(() => {
          return trackLinkMatomo(params)
        })
      }
    },
    [trackLinkMatomo, track],
  )

  return {
    trackPageView,
    trackEvent,
    trackEvents,
    trackLink,
  }
}
