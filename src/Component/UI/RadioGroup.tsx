/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type PrimitivePropsWithRef } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'
import { forwardRef, type ChangeEvent, type Ref, type ComponentPropsWithoutRef } from 'react'

type ItemProps<T extends string> = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'name' | 'value'> & {
  id: string
  label: string
  value: T
}

type RadioGroupProps<T extends string> = Omit<PrimitivePropsWithRef<'fieldset'>, 'onChange' | 'name'> & {
  value: T
  col?: boolean
  name: string
  onChange?: (evt: ChangeEvent<HTMLInputElement>, value: T) => void
  items: Array<ItemProps<T>>
  legend?: string
  error?: boolean
}

const RadioGroup = forwardRef(
  <T extends string>(
    { value, onChange, items, col = false, legend, asChild = false, name, error, ...props }: RadioGroupProps<T>,
    ref: Ref<HTMLFieldSetElement>,
  ) => {
    const Comp = asChild ? Slot : 'fieldset'

    return (
      <Comp ref={ref} {...props}>
        {legend != null && <legend className="sr-only">{legend}</legend>}
        <div className={twMerge('space-y-3', !col && 'sm:flex sm:items-center sm:space-x-10 sm:space-y-0')}>
          {items.map(({ className, id, label, value: itemValue, ...item }) => {
            return (
              <div key={id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={id}
                  name={name}
                  className={twMerge('h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600', className)}
                  checked={value === itemValue}
                  onChange={(evt) => {
                    onChange?.(evt, itemValue)
                  }}
                  {...item}
                />
                <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  {label}
                </label>
              </div>
            )
          })}
        </div>
      </Comp>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup as <T extends string>(props: RadioGroupProps<T>) => JSX.Element
