/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Dialog as HeadlessDialog, type DialogProps } from '@headlessui/react'
import { fadeEaseAnimate, fadeScaleAnimate } from 'App/Lib/Framer'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode } from 'react'

function Dialog({
  title,
  actions,
  open,
  children,
  className,
  ...props
}: { title: ReactNode; actions: ReactNode; open: boolean; className?: string } & Omit<
  DialogProps<'div'>,
  'title' | 'unmount' | 'className' | 'open'
>) {
  return (
    <AnimatePresence>
      {open && (
        <HeadlessDialog static as={motion.div} open={open} className={cx('relative z-40', className)} {...props}>
          {(state) => (
            <>
              <motion.div {...fadeEaseAnimate} className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />

              <motion.div {...fadeScaleAnimate} className="fixed inset-0 mx-auto max-w-6xl p-4">
                <HeadlessDialog.Panel className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-xl">
                  <div className="flex h-full flex-col">
                    <div className="p-6">
                      <HeadlessDialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </HeadlessDialog.Title>
                    </div>
                    <div className="flex grow flex-col overflow-y-auto">
                      {typeof children === 'function' ? children(state) : children}
                    </div>
                    <div className="flex bg-gray-50 p-6">{actions}</div>
                  </div>
                </HeadlessDialog.Panel>
              </motion.div>
            </>
          )}
        </HeadlessDialog>
      )}
    </AnimatePresence>
  )
}

export default Dialog
