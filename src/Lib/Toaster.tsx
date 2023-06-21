/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import * as Alert from 'App/Component/UI/Alert'
import { fadeScaleAnimate } from 'App/Lib/Framer'
import { type Severity } from 'App/Type/Severity'
import { AnimatePresence, motion } from 'framer-motion'
import { type PropsWithChildren, type ReactNode } from 'react'
import { toast as hotToast, type ToastOptions as HotToastOptions } from 'react-hot-toast'

type ToastId = string

type ToastOptions = HotToastOptions & {
  onDismiss?: (id: string) => void
}

const AlertRootMotion = motion(Alert.Root)

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
    <AnimatePresence>
      {visible && (
        <AlertRootMotion
          {...fadeScaleAnimate}
          key="alert"
          severity={severity}
          className="shadow-lg ring-1 ring-black/5"
        >
          <Alert.Content>
            <Alert.Icon severity={severity} className="flex items-center py-4 pl-4" />
            <Alert.Message severity={severity} className="py-4">
              {children}
            </Alert.Message>

            <Alert.Close severity={severity} onClick={onDismiss} />
          </Alert.Content>
        </AlertRootMotion>
      )}
    </AnimatePresence>
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
