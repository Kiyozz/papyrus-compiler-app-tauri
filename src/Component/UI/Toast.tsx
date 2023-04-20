/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { XMarkIcon } from '@heroicons/react/24/solid'
import Alert, { type AlertProps } from 'App/Component/UI/Alert'
import { fadeScaleAnimate } from 'App/Lib/Framer'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { None, type Option, Some } from 'ts-results'

function Toast({
  open,
  duration = 4000,
  severity = 'info',
  children,
  dismissible = true,
  dismiss,
  zIndex = 'default',
}: PropsWithChildren<{
  open: boolean
  duration?: number
  severity?: AlertProps['severity']
  dismissible?: boolean
  dismiss?: () => void
  zIndex?: 'default' | 'above' | 'below'
}>) {
  const timer = useRef<Option<NodeJS.Timeout>>(None)

  const startTimer = () => {
    if (timer.current.some) {
      clearTimeout(timer.current.unwrap())
    }

    if (duration === Infinity) {
      return
    }

    const newTimer = setTimeout(() => {
      dismiss?.()
    }, duration)

    timer.current = Some(newTimer)
  }

  const stopTimer = () => {
    if (timer.current.some) {
      clearTimeout(timer.current.unwrap())
    }
  }

  useEffect(() => {
    if (open) {
      startTimer()
    }

    return () => {
      stopTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          {...fadeScaleAnimate}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          className={cx('fixed bottom-2 left-2', zIndex === 'default' ? 'z-30' : zIndex === 'above' ? 'z-50' : 'z-0')}
        >
          <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 sm:max-w-lg lg:max-w-xl">
            <Alert severity={severity}>
              <div className="flex items-center">
                {children}
                {dismissible && (
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        dismiss?.()
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </Alert>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Toast
