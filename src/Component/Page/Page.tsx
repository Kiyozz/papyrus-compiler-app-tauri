/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/Conf/UseConf'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { twMerge } from 'tailwind-merge'
import { type PropsWithChildren } from 'react'

function Page({ children, className }: PropsWithChildren<{ className?: string }>) {
  const conf = useConf()

  if (!isQueryNonNullable(conf)) return <>Waiting...</>

  return (
    <main
      className={twMerge(
        'min-h-app w-full rounded-none p-6 transition-[padding-left] duration-[225ms] ease-sharp',
        conf.data.misc.drawerOpen ? 'pl-[13.5rem]' : 'pl-20',
        className,
      )}
    >
      {children}
    </main>
  )
}

export default Page
