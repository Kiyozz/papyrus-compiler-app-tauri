/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import { type PropsWithChildren } from 'react'

function PageAppBar({ title, className, children }: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <div className={cx('sticky top-0 z-20 bg-white px-6 py-4 dark:bg-gray-800', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              {title}
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PageAppBar
