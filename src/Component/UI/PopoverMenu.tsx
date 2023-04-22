/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Transition, Menu as HeadlessMenu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Button from 'App/Component/UI/Button'
import cx from 'classnames'
import { type ComponentPropsWithoutRef, forwardRef, Fragment, type Ref } from 'react'

function PopoverMenu({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessMenu>) {
  return <HeadlessMenu className={cx('relative', className)} {...props} />
}

function PopoverMenuItem(
  { className, ...props }: ComponentPropsWithoutRef<typeof HeadlessMenu.Item>,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <HeadlessMenu.Item
      as="button"
      className={cx(
        'block w-full px-4 py-2 text-left text-sm text-gray-700 ui-active:bg-gray-50 ui-disabled:opacity-50 ui-not-disabled:hover:bg-gray-100',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

function PopoverMenuPanel(
  {
    className,
    children,
    position = 'bottom',
    ...props
  }: ComponentPropsWithoutRef<typeof HeadlessMenu.Items> & { position?: 'top-right' | 'bottom' },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <HeadlessMenu.Items
      className={cx(
        'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none',
        position === 'top-right' && '-top-1/2 origin-bottom-left -translate-y-full translate-x-1/2',
        className,
      )}
      ref={ref}
      {...props}
    >
      {(state) => <>{typeof children === 'function' ? children(state) : children}</>}
    </HeadlessMenu.Items>
  )
}

function PopoverMenuButton(props: ComponentPropsWithoutRef<typeof HeadlessMenu.Button>, ref: Ref<typeof Button>) {
  return (
    <Button
      as={HeadlessMenu.Button}
      startIcon={<ChevronDownIcon />}
      variant="secondary"
      color="inherit"
      ref={ref}
      {...props}
    />
  )
}

function PopoverMenuTransition(props: ComponentPropsWithoutRef<typeof Transition>) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
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
