/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Primitive, type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'
import { type ElementRef, forwardRef } from 'react'

export type ListElement = ElementRef<typeof Primitive.ul>
export type ListProps = PrimitivePropsWithRef<typeof Primitive.ul>

const List = forwardRef<ListElement, ListProps>(({ asChild = false, children, className, ...props }, ref) => {
  const Comp = asChild ? Slot : Primitive.ul

  return (
    <Comp
      className={twMerge('divide-y divide-gray-300 rounded-md border border-gray-300 dark:border-gray-700', className)}
      {...props}
      ref={ref}
    >
      {children}
    </Comp>
  )
})

List.displayName = 'List.Root'

export type ListItemElement = ElementRef<typeof Primitive.li>
export type ListItemProps = PrimitivePropsWithRef<typeof Primitive.li>

const ListItem = forwardRef<ListItemElement, ListItemProps>(
  ({ asChild = false, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Primitive.li

    return (
      <Comp className={twMerge('px-6 py-2', className)} {...props} ref={ref}>
        {children}
      </Comp>
    )
  },
)

ListItem.displayName = 'List.Item'

export { List as Root, List, ListItem as Item }
