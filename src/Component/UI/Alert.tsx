/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { type Severity } from 'App/Type/Severity'
import cx from 'classnames'
import { type ComponentPropsWithoutRef, forwardRef, type Ref } from 'react'

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  severity?: Severity
}

export function AlertIcon({
  className,
  severity,
}: Omit<ComponentPropsWithoutRef<'div'>, 'children'> & { severity: Severity }) {
  const isError = severity === 'error'
  const isWarning = severity === 'warning'
  const isInfo = severity === 'info'
  const isSuccess = severity === 'success'

  return (
    <div className={cx('shrink-0', className)}>
      {isError && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
      {isWarning && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />}
      {isInfo && <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />}
      {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
    </div>
  )
}

export function AlertMessage({
  children,
  severity,
  className,
}: ComponentPropsWithoutRef<'div'> & { severity: Severity }) {
  const isError = severity === 'error'
  const isWarning = severity === 'warning'
  const isInfo = severity === 'info'
  const isSuccess = severity === 'success'

  return (
    <div
      className={cx(
        'ml-3 grow text-sm font-medium',
        isInfo && 'text-blue-700',
        isError && 'text-red-700',
        isWarning && 'text-yellow-700',
        isSuccess && 'text-green-700',
        className,
      )}
    >
      {children}
    </div>
  )
}

function AlertContentRoot(
  { children, severity, className }: ComponentPropsWithoutRef<'div'> & { severity: Severity },
  ref: Ref<HTMLDivElement>,
) {
  const isError = severity === 'error'
  const isWarning = severity === 'warning'
  const isInfo = severity === 'info'
  const isSuccess = severity === 'success'

  return (
    <div
      className={cx(
        'rounded-md',
        isInfo && 'bg-blue-50',
        isWarning && 'bg-yellow-50',
        isError && 'bg-red-50',
        isSuccess && 'bg-green-50',
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  )
}

export const AlertContent = forwardRef(AlertContentRoot)

AlertContent.displayName = 'AlertContent'

function AlertRoot({ severity = 'info', className, children, ...props }: AlertProps, ref: Ref<HTMLDivElement>) {
  const isError = severity === 'error'
  const isWarning = severity === 'warning'
  const isInfo = severity === 'info'
  const isSuccess = severity === 'success'

  return (
    <AlertContent
      severity={severity}
      className={cx(
        'rounded-md',
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
        <AlertIcon severity={severity} />
        <AlertMessage severity={severity}>{children}</AlertMessage>
      </div>
    </AlertContent>
  )
}

const Alert = forwardRef(AlertRoot)

Alert.displayName = 'Alert'

export default Alert
