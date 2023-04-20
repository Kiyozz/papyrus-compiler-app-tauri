/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/Conf/UseConf'
import cx from 'classnames'
import { type PropsWithChildren } from 'react'

function PageAppBar({ title, className, children }: PropsWithChildren<{ title: string; className?: string }>) {
  const conf = useConf()
  const isDrawerOpen = conf.data?.misc.drawerOpen ?? false

  return (
    <div
      className={cx(
        'sticky top-0 z-20 bg-white py-4 pr-6 transition-[padding-left] duration-[225ms] ease-sharp dark:bg-gray-800',
        isDrawerOpen ? 'pl-[13.5rem]' : 'pl-[calc(56px+1.5rem)]',
        className,
      )}
    >
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
