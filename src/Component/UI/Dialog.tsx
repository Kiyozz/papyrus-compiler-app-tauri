/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Dialog as HeadlessDialog, type DialogProps as HeadlessDialogProps } from '@headlessui/react'
import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { fadeEaseAnimate, fadeScaleAnimate } from 'App/Lib/Framer'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { type ElementRef, forwardRef } from 'react'

export type DialogElement = ElementRef<typeof Primitive.div>
export type DialogProps = { open: boolean; className?: string; fullScreen?: boolean } & Omit<
  HeadlessDialogProps<'div'>,
  'unmount' | 'className' | 'open'
> & { asChild?: boolean }

const Dialog = forwardRef<DialogElement, DialogProps>(
  ({ asChild = false, fullScreen = false, open, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.div

    return (
      <AnimatePresence>
        {open && (
          <HeadlessDialog static as={motion.div} open={open} className={cx('relative z-40', className)} {...props}>
            {(state) => (
              <>
                <motion.div {...fadeEaseAnimate} className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />

                <motion.div {...fadeScaleAnimate} className="fixed inset-0 mx-auto max-w-6xl p-4">
                  <div
                    className={cx(
                      'fixed mx-auto max-w-6xl p-4',
                      fullScreen ? 'inset-0' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    )}
                  >
                    <HeadlessDialog.Panel className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-xl">
                      <Comp className="flex h-full flex-col" ref={ref}>
                        {typeof children === 'function' ? children(state) : children}
                      </Comp>
                    </HeadlessDialog.Panel>
                  </div>
                </motion.div>
              </>
            )}
          </HeadlessDialog>
        )}
      </AnimatePresence>
    )
  },
)

Dialog.displayName = 'Dialog'

export type DialogTitleElement = ElementRef<typeof Primitive.div>
export type DialogTitleProps = PrimitivePropsWithRef<typeof Primitive.div>

const DialogTitle = forwardRef<DialogTitleElement, DialogTitleProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.div

    return (
      <HeadlessDialog.Title
        as={Comp}
        ref={ref}
        className={cx('p-6 text-base font-semibold leading-6 text-gray-900', className)}
        {...props}
      >
        {children}
      </HeadlessDialog.Title>
    )
  },
)

DialogTitle.displayName = 'Dialog.Title'

export type DialogActionsElement = ElementRef<typeof Primitive.div>
export type DialogActionsProps = PrimitivePropsWithRef<typeof Primitive.div>

const DialogActions = forwardRef<DialogActionsElement, DialogActionsProps>(
  ({ asChild = false, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.div

    return (
      <Comp className={cx('flex bg-gray-50 p-6', className)} ref={ref} {...props}>
        {children}
      </Comp>
    )
  },
)

DialogActions.displayName = 'Dialog.Actions'

export type DialogContentElement = ElementRef<typeof Primitive.div>
export type DialogContentProps = PrimitivePropsWithRef<typeof Primitive.div>

const DialogContent = forwardRef<DialogContentElement, DialogContentProps>(
  ({ asChild = false, className, children }, ref) => {
    const Comp = asChild ? Slot : Primitive.div

    return (
      <Comp className={cx('flex grow flex-col overflow-y-auto', className)} ref={ref}>
        {children}
      </Comp>
    )
  },
)

DialogContent.displayName = 'Dialog.Content'

export { DialogTitle as Title, Dialog as Root, DialogActions as Actions, DialogContent as Content }
