/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Transition, Menu as HeadlessMenu, type MenuItemsProps } from '@headlessui/react'
import { type Primitive } from '@radix-ui/react-primitive'
import * as Button from 'App/Component/UI/Button'
import cx from 'classnames'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, Fragment, type PropsWithChildren } from 'react'

function FloatingMenu({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessMenu>) {
  return <HeadlessMenu className={cx('relative', className)} {...props} />
}

const FloatingMenuItem = forwardRef<ElementRef<'button'>, ComponentPropsWithoutRef<typeof HeadlessMenu.Item>>(
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

FloatingMenuItem.displayName = 'FloatingMenu.Item'

export type FloatingMenuPanelElement = ElementRef<typeof Primitive.div>
export type FloatingMenuPanelProps = MenuItemsProps<typeof Primitive.div> & {
  position?: 'top-right' | 'bottom'
  className?: string
}

const FloatingMenuPanel = forwardRef<FloatingMenuPanelElement, FloatingMenuPanelProps>(
  ({ className, children, position = 'bottom', ...props }, ref) => (
    <HeadlessMenu.Items
      className={cx(
        'absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none',
        position === 'top-right' && '-top-1/2 left-0 origin-bottom-left -translate-y-full',
        className,
        (typeof className === 'string' || typeof className === 'undefined') &&
          (className?.includes('mt-') ?? false ? '' : 'mt-2'),
      )}
      ref={ref}
      {...props}
    >
      {(state) => <>{typeof children === 'function' ? children(state) : children}</>}
    </HeadlessMenu.Items>
  ),
)

FloatingMenuPanel.displayName = 'FloatingMenu.Panel'

export type FloatingMenuButtonElement = ElementRef<typeof HeadlessMenu.Button>
export type FloatingMenuButtonProps = Button.ButtonProps

const FloatingMenuButton = forwardRef<FloatingMenuButtonElement, FloatingMenuButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button.Root asChild {...props}>
        <HeadlessMenu.Button ref={ref}>{children}</HeadlessMenu.Button>
      </Button.Root>
    )
  },
)

FloatingMenuButton.displayName = 'FloatingMenu.Button'

function FloatingMenuTransition(props: ComponentPropsWithoutRef<typeof Transition>) {
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
  FloatingMenu as Root,
  FloatingMenuButton as Button,
  FloatingMenuItem as Item,
  FloatingMenuTransition as Transition,
  FloatingMenuPanel as Panel,
}
