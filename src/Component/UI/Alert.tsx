/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { Slot } from '@radix-ui/react-slot'
import { type Severity } from 'App/Type/Severity'
import { twMerge } from 'tailwind-merge'
import { type ElementRef, forwardRef } from 'react'

export type AlertIconElement = ElementRef<typeof Primitive.div>
export type AlertIconProps = PrimitivePropsWithRef<'div'> & { severity: Severity }

export const AlertIcon = forwardRef<AlertIconElement, AlertIconProps>(
  ({ asChild = false, className, severity, ...props }, ref) => {
    const isError = severity === 'error'
    const isWarning = severity === 'warning'
    const isInfo = severity === 'info'
    const isSuccess = severity === 'success'
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp className={twMerge('shrink-0', className)} ref={ref}>
        {isError && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
        {isWarning && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />}
        {isInfo && <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />}
        {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
      </Comp>
    )
  },
)

AlertIcon.displayName = 'Alert.Icon'

export type AlertMessageElement = ElementRef<typeof Primitive.div>
export type AlertMessageProps = PrimitivePropsWithRef<'div'> & { severity: Severity }

const AlertMessage = forwardRef<AlertMessageElement, AlertMessageProps>(
  ({ children, severity, asChild = false, className }: PrimitivePropsWithRef<'div'> & { severity: Severity }, ref) => {
    const Comp = asChild ? Slot : Primitive.div
    const isError = severity === 'error'
    const isWarning = severity === 'warning'
    const isInfo = severity === 'info'
    const isSuccess = severity === 'success'

    return (
      <Comp
        className={twMerge(
          'ml-3 grow text-sm font-medium',
          isInfo && 'text-blue-700',
          isError && 'text-red-700',
          isWarning && 'text-yellow-700',
          isSuccess && 'text-green-700',
          className,
        )}
        ref={ref}
      >
        {children}
      </Comp>
    )
  },
)

AlertMessage.displayName = 'Alert.Message'

export type AlertContentElement = ElementRef<typeof Primitive.div>
export type AlertContentProps = PrimitivePropsWithRef<typeof Primitive.div>

const AlertContent = forwardRef<AlertContentElement, AlertContentProps>(
  ({ children, asChild = false, className }, ref) => {
    const Comp = asChild ? Slot : Primitive.div

    return (
      <Comp className={twMerge('flex', className)} ref={ref}>
        {children}
      </Comp>
    )
  },
)

AlertContent.displayName = 'Alert.Content'

export type AlertElement = ElementRef<typeof Primitive.div>
export type AlertProps = PrimitivePropsWithRef<typeof Primitive.div> & {
  severity?: Severity
}

const Alert = forwardRef<AlertElement, AlertProps>(
  ({ severity = 'info', asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.div
    const isError = severity === 'error'
    const isWarning = severity === 'warning'
    const isInfo = severity === 'info'
    const isSuccess = severity === 'success'

    return (
      <Comp
        className={twMerge(
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
        {children}
      </Comp>
    )
  },
)

Alert.displayName = 'Alert.Root'

export { AlertContent as Content, AlertIcon as Icon, AlertMessage as Message, Alert, Alert as Root }
