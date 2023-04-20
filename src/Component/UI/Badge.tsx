/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import { type PropsWithChildren } from 'react'

function Badge({ children, variant = 'default' }: PropsWithChildren<{ variant?: 'error' | 'success' | 'default' }>) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium',
        variant === 'error' && 'bg-red-100 text-red-700',
        variant === 'default' && 'bg-gray-100 text-gray-600',
        variant === 'success' && 'bg-green-100 text-green-700',
      )}
    >
      {children}
    </span>
  )
}

export default Badge
