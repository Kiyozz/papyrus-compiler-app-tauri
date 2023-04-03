/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Button from 'App/Component/UI/Button'
import cx from 'classnames'
import { type ComponentPropsWithoutRef, forwardRef, Fragment, type Ref } from 'react'

function PopoverMenu({ className, ...props }: ComponentPropsWithoutRef<typeof Popover>) {
  return <Popover className={cx('relative', className)} {...props} />
}

function PopoverMenuItem(
  { className, ...props }: ComponentPropsWithoutRef<typeof Popover.Button>,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <Popover.Button
      className={cx('block w-full whitespace-nowrap p-2 text-left hover:text-indigo-600', className)}
      ref={ref}
      {...props}
    />
  )
}

function PopoverMenuPanel(
  { className, children, ...props }: ComponentPropsWithoutRef<typeof Popover.Panel>,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <Popover.Panel
      className={cx('absolute -right-4 z-10 mt-1 flex w-screen max-w-min px-4', className)}
      ref={ref}
      {...props}
    >
      {(state) => (
        <div className="shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          {typeof children === 'function' ? children(state) : children}
        </div>
      )}
    </Popover.Panel>
  )
}

function PopoverMenuButton(
  { className, ...props }: ComponentPropsWithoutRef<typeof Popover.Button>,
  ref: Ref<typeof Button>,
) {
  return (
    <Button as={Popover.Button} startIcon={<ChevronDownIcon />} variant="link" color="inherit" ref={ref} {...props} />
  )
}

function PopoverMenuTransition(props: ComponentPropsWithoutRef<typeof Transition>) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
      {...props}
    />
  )
}

PopoverMenu.Button = forwardRef(PopoverMenuButton)
PopoverMenu.Item = forwardRef(PopoverMenuItem)
PopoverMenu.Transition = PopoverMenuTransition
PopoverMenu.Panel = forwardRef(PopoverMenuPanel)

export default PopoverMenu as typeof PopoverMenu & {
  Item: typeof PopoverMenuItem
  Button: typeof PopoverMenuButton
  Transition: typeof PopoverMenuTransition
  Panel: typeof PopoverMenuPanel
}
