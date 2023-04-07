/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import { forwardRef, type ChangeEvent, type Ref, type ComponentPropsWithoutRef } from 'react'

type ItemProps<T extends string> = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'name' | 'value'> & {
  id: string
  label: string
  value: T
}

type RadioGroupProps<T extends string> = Omit<ComponentPropsWithoutRef<'fieldset'>, 'onChange' | 'name'> & {
  value: T
  col?: boolean
  name: string
  onChange?: (evt: ChangeEvent<HTMLInputElement>, value: T) => void
  items: Array<ItemProps<T>>
  legend?: string
  error?: boolean
}

function RadioGroupRoot<T extends string>(
  { value, onChange, items, col = false, legend, name, error, ...props }: RadioGroupProps<T>,
  ref: Ref<HTMLFieldSetElement>,
) {
  return (
    <fieldset ref={ref} {...props}>
      {legend != null && <legend className="sr-only">{legend}</legend>}
      <div className={cx('space-y-3', !col && 'sm:flex sm:items-center sm:space-x-10 sm:space-y-0')}>
        {items.map(({ className, id, label, value: itemValue, ...item }) => {
          return (
            <div key={id} className="flex items-center space-x-3">
              <input
                type="radio"
                id={id}
                name={name}
                className={cx('h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600', className)}
                checked={value === itemValue}
                onChange={(evt) => {
                  onChange?.(evt, itemValue)
                }}
                {...item}
              />
              <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

RadioGroupRoot.displayName = 'RadioGroup'

const RadioGroup = forwardRef(RadioGroupRoot) as <T extends string>(props: RadioGroupProps<T>) => JSX.Element

export default RadioGroup
