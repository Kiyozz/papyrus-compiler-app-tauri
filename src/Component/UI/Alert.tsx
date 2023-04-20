/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import { type ComponentPropsWithoutRef, forwardRef, type Ref } from 'react'

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  severity?: 'success' | 'error' | 'warning' | 'info'
}

function AlertRoot({ severity = 'info', className, children, ...props }: AlertProps, ref: Ref<HTMLDivElement>) {
  const isError = severity === 'error'
  const isWarning = severity === 'warning'
  const isInfo = severity === 'info'
  const isSuccess = severity === 'success'

  return (
    <div
      className={cx(
        'rounded-md p-4',
        isInfo && 'bg-blue-50',
        isWarning && 'bg-yellow-50',
        isError && 'bg-red-50',
        isSuccess && 'bg-green-50',
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="flex">
        <div className="shrink-0">
          {isError && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
          {isWarning && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />}
          {isInfo && <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />}
          {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
        </div>
        <div
          className={cx(
            'ml-3 text-sm font-medium',
            isInfo && 'text-blue-700',
            isError && 'text-red-700',
            isWarning && 'text-yellow-700',
            isSuccess && 'text-green-700',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const Alert = forwardRef(AlertRoot)

Alert.displayName = 'Alert'

export default Alert
