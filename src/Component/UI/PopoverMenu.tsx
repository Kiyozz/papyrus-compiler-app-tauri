/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Transition, Menu as HeadlessMenu } from '@headlessui/react'
import * as Button from 'App/Component/UI/Button'
import cx from 'classnames'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, Fragment, type PropsWithChildren } from 'react'

function PopoverMenu({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessMenu>) {
  return <HeadlessMenu className={cx('relative', className)} {...props} />
}

const PopoverMenuItem = forwardRef<ElementRef<'button'>, ComponentPropsWithoutRef<typeof HeadlessMenu.Item>>(
  ({ className, ...props }, ref) => (
    <HeadlessMenu.Item
      as="button"
      className={cx(
        'block w-full px-4 py-2 text-left text-sm text-gray-700 ui-active:bg-gray-50 ui-disabled:opacity-50 ui-not-disabled:hover:bg-gray-100',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)

PopoverMenuItem.displayName = 'PopoverMenu.Item'

const PopoverMenuPanel = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<typeof HeadlessMenu.Items> & { position?: 'top-right' | 'bottom' }
>(({ className, children, position = 'bottom', ...props }, ref) => (
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
))

PopoverMenuPanel.displayName = 'PopoverMenu.Panel'

export type PopoverMenuButtonElement = ElementRef<typeof HeadlessMenu.Button>
export type PopoverMenuButtonProps = PropsWithChildren<
  Omit<ComponentPropsWithoutRef<typeof HeadlessMenu.Button>, 'children'>
> & {
  variant?: Button.ButtonProps['variant']
}

const PopoverMenuButton = forwardRef<PopoverMenuButtonElement, PopoverMenuButtonProps>(
  ({ children, variant, ...props }, ref) => {
    if (typeof children === 'function') {
      throw new TypeError('PopoverMenu.Button children must be a node, not a function')
    }

    return (
      <Button.Root asChild variant={variant ?? 'secondary'} color="inherit" ref={ref}>
        <HeadlessMenu.Button ref={ref} {...props}>
          {children}
        </HeadlessMenu.Button>
      </Button.Root>
    )
  },
)

PopoverMenuButton.displayName = 'PopoverMenu.Button'

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

export {
  PopoverMenu as Root,
  PopoverMenuButton as Button,
  PopoverMenuItem as Item,
  PopoverMenuTransition as Transition,
  PopoverMenuPanel as Panel,
}
