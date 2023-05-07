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
import { Fragment, type ReactNode } from 'react'
import { toast as hotToast, type ToastOptions } from 'react-hot-toast'

type ToastId = string

const Toast = ({
  severity,
  message,
  onDismiss,
  visible,
}: {
  severity: Severity
  message: ReactNode
  onDismiss: () => void
  visible: boolean
}) => {
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
      <Alert.Content severity={severity} className="shadow-lg ring-1 ring-black/5">
        <div className="flex">
          <Alert.Icon severity={severity} className="py-4 pl-4" />
          <Alert.Message severity={severity} className="py-4">
            {message}
          </Alert.Message>

          <button onClick={onDismiss} className="p-4">
            <XMarkIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </Alert.Content>
    </Transition>
  )
}

export const toast = {
  error: (message: ReactNode, options?: ToastOptions): ToastId =>
    hotToast.custom((t) => {
      return (
        <Toast
          severity="error"
          message={message}
          onDismiss={() => {
            hotToast.dismiss(t.id)
          }}
          visible={t.visible}
        />
      )
    }, options),
  success: (message: ReactNode, options?: ToastOptions): ToastId =>
    hotToast.custom((t) => {
      return (
        <Toast
          severity="success"
          message={message}
          onDismiss={() => {
            hotToast.dismiss(t.id)
          }}
          visible={t.visible}
        />
      )
    }, options),
}
