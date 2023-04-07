/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Switch as HeadlessSwitch } from '@headlessui/react'
import cx from 'classnames'
import { forwardRef, type Ref } from 'react'

type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  label: string
  name: string
  id?: string
}

function SwitchRoot(
  { checked, onChange, label, name, id = name, className, ...props }: SwitchProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <HeadlessSwitch.Group as="div" ref={ref} className="mt-5 flex items-center">
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={cx(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
          checked ? 'bg-indigo-600' : 'bg-gray-200',
          className,
        )}
        id={id}
        name={name}
        {...props}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={cx(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </HeadlessSwitch>
      <HeadlessSwitch.Label as="span" className="ml-3 cursor-default text-sm" tabIndex={-1}>
        <span className="font-medium text-gray-900">{label}</span>
      </HeadlessSwitch.Label>
    </HeadlessSwitch.Group>
  )
}

const Switch = forwardRef(SwitchRoot)

Switch.displayName = 'Switch'

export default Switch
