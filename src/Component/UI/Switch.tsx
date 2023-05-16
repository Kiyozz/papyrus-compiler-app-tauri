/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Switch as HeadlessSwitch } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'

type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  label: string
  name: string
  id?: string
  disabled?: boolean
}

export type SwitchElement = HTMLDivElement

const Switch = forwardRef<SwitchElement, SwitchProps>(
  ({ checked, onChange, label, name, id = name, className, disabled = false, ...props }, ref) => (
    <HeadlessSwitch.Group
      as="div"
      ref={ref}
      className={twMerge(
        'group flex items-center aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className,
      )}
      aria-disabled={disabled ? 'true' : undefined}
      {...props}
    >
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={twMerge(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
          checked ? 'bg-indigo-600' : 'bg-gray-200',
        )}
        id={id}
        name={name}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={twMerge(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </HeadlessSwitch>
      <HeadlessSwitch.Label as="span" className="ml-3 cursor-default text-sm" tabIndex={-1}>
        <span className="font-medium text-gray-900">{label}</span>
      </HeadlessSwitch.Label>
    </HeadlessSwitch.Group>
  ),
)

Switch.displayName = 'Switch'

export default Switch
