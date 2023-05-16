/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { Dialog as HeadlessDialog, type DialogProps as HeadlessDialogProps, Transition } from '@headlessui/react'
import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'
import { type ElementRef, forwardRef, Fragment } from 'react'

export type DialogElement = ElementRef<typeof Primitive.div>
export type DialogProps = {
  open: boolean
  className?: string
  fullScreen?: boolean
  onClose?: (open: boolean) => void
  onLeaveEnd?: () => void
} & Omit<HeadlessDialogProps<typeof Primitive.div>, 'unmount' | 'className' | 'open' | 'onClose'>

const Dialog = forwardRef<DialogElement, DialogProps>(
  ({ asChild = false, fullScreen = false, open, onLeaveEnd, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.div

    return (
      <Transition.Root show={open} as={Fragment}>
        <HeadlessDialog
          static
          as={Primitive.div}
          open={open}
          className="relative z-40"
          onClose={props.onClose ?? (() => {})}
          {...props}
        >
          {(state) => (
            <>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={onLeaveEnd}
              >
                <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-[0.98]"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 scale-[0.98]"
              >
                <div className="fixed inset-0 mx-auto max-w-6xl p-4">
                  <div
                    className={twMerge(
                      'fixed mx-auto max-w-6xl p-4',
                      fullScreen ? 'inset-0' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                      className,
                    )}
                  >
                    <HeadlessDialog.Panel className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-900">
                      <Comp className="flex h-full flex-col" ref={ref}>
                        {typeof children === 'function' ? children(state) : children}
                      </Comp>
                    </HeadlessDialog.Panel>
                  </div>
                </div>
              </Transition.Child>
            </>
          )}
        </HeadlessDialog>
      </Transition.Root>
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
        className={twMerge('p-6 text-base font-semibold leading-6 text-gray-900 dark:text-white', className)}
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
      <Comp className={twMerge('flex bg-gray-50 p-6 dark:bg-gray-800', className)} ref={ref} {...props}>
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
      <Comp className={twMerge('flex grow flex-col overflow-y-auto', className)} ref={ref}>
        {children}
      </Comp>
    )
  },
)

DialogContent.displayName = 'Dialog.Content'

export { DialogTitle as Title, Dialog as Root, DialogActions as Actions, DialogContent as Content }
