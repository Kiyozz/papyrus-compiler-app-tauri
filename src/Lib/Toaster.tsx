/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import * as Alert from 'App/Component/UI/Alert'
import { type Severity } from 'App/Type/Severity'
import { Fragment, type PropsWithChildren, type ReactNode } from 'react'
import { toast as hotToast, type ToastOptions as HotToastOptions } from 'react-hot-toast'

type ToastId = string

type ToastOptions = HotToastOptions & {
  onDismiss?: (id: string) => void
}

const Toast = ({
  severity,
  onDismiss,
  visible,
  children,
}: PropsWithChildren<{
  severity: Severity
  onDismiss: () => void
  visible: boolean
}>) => {
  return (
    <Transition
      as={Fragment}
      appear
      unmount={false}
      show={visible}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Alert.Root severity={severity} className="shadow-lg ring-1 ring-black/5">
        <Alert.Content>
          <Alert.Icon severity={severity} className="flex items-center py-4 pl-4" />
          <Alert.Message severity={severity} className="py-4">
            {children}
          </Alert.Message>

          <button onClick={onDismiss} className="p-4">
            <XMarkIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          </button>
        </Alert.Content>
      </Alert.Root>
    </Transition>
  )
}

export const toast = {
  error: (message: ReactNode, { onDismiss, ...options }: ToastOptions = {}): ToastId =>
    hotToast.custom((t) => {
      return (
        <Toast
          severity="error"
          onDismiss={() => {
            hotToast.dismiss(t.id)
            onDismiss?.(t.id)
          }}
          visible={t.visible}
        >
          {message}
        </Toast>
      )
    }, options),
  success: (message: ReactNode, { onDismiss, ...options }: ToastOptions = {}): ToastId =>
    hotToast.custom((t) => {
      return (
        <Toast
          severity="success"
          onDismiss={() => {
            hotToast.dismiss(t.id)
            onDismiss?.(t.id)
          }}
          visible={t.visible}
        >
          {message}
        </Toast>
      )
    }, options),
  info: (message: ReactNode, { onDismiss, ...options }: ToastOptions = {}): ToastId =>
    hotToast.custom((t) => {
      return (
        <Toast
          severity="info"
          onDismiss={() => {
            hotToast.dismiss(t.id)
            onDismiss?.(t.id)
          }}
          visible={t.visible}
        >
          {message}
        </Toast>
      )
    }, options),
}

export { hotToast as toastManager }
